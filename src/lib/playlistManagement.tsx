import {
  getUserPlaylistData,
  setUserPlaylistData,
} from "@/lib/storageManagement";
import { PrivacyStatus } from "@/lib/types/gapiTypes";
import { PlaylistData, SetMessageCallback } from "@/lib/types/playlistTypes";
import { getRandomElements } from "@/lib/utils/collectionUtils";
import { getUserId, isUserSignedIn } from "@/lib/utils/authUtils";
import {
  checkPlaylistEtag,
  EXCLUDING_PLAYLISTS_MESSAGE_TIME_MS,
  getPaginatedItems,
  getVideoIdsFromPlaylistData,
  NO_OVERLAY_MESSAGE,
  PLAYLIST_CREATED_MESSAGE_TIME_MS,
  PLAYLIST_ITEM_PART,
  PLAYLIST_PART,
  trimPlaylistItemProperties,
  trimPlaylistProperties,
} from "@/lib/utils/playlistUtils";
import { waitForMs } from "@/lib/utils/miscUtils";

export interface CreateRandomizedPlaylistOptions {
  playlistTitle: string;
  numPlaylistItems: number;
  privacyStatus: PrivacyStatus;
  excludedPlaylistNames: string[];
  setMessageCallback: SetMessageCallback;
}

let playlistData: PlaylistData;
let videoIds: string[];

export async function createRandomizedPlaylist({
  playlistTitle,
  numPlaylistItems,
  privacyStatus,
  excludedPlaylistNames,
  setMessageCallback,
}: CreateRandomizedPlaylistOptions) {
  const isSignedIn = await isUserSignedIn();

  if (!isSignedIn) {
    console.log("not signed in");
    return [];
  }

  if (excludedPlaylistNames.length > 0) {
    setMessageCallback(
      <>
        Excluding playlists:
        <br />
        {excludedPlaylistNames.join(", ")}
      </>,
    );
    updateVideoIds(excludedPlaylistNames);
  }

  await waitForMs(EXCLUDING_PLAYLISTS_MESSAGE_TIME_MS);

  const selectedVideoIds = getRandomElements(videoIds, numPlaylistItems);

  await createPlaylistWithVideos(
    selectedVideoIds,
    playlistTitle,
    privacyStatus,
    setMessageCallback,
  );
}

/**
 * Creates a playlist for the auth user with the given videos.
 */
export async function createPlaylistWithVideos(
  videoIds: string[],
  playlistTitle: string,
  privacyStatus: PrivacyStatus,
  setMessageCallback: SetMessageCallback,
) {
  setMessageCallback(`Creating playlist ${playlistTitle}...`);
  // FIXME
  // const response = await gapi.client.youtube.playlists.insert({
  //   part: "id, snippet, status",
  //   resource: {
  //     snippet: {
  //       title: playlistTitle,
  //     },
  //     status: {
  //       privacyStatus: privacyStatus,
  //     },
  //   },
  // });
  // const playlist: Playlist = JSON.parse(response.body);
  const playlist = {
    snippet: {
      title: "test playlist",
    },
  };

  setMessageCallback("Adding videos to playlist...");
  for (const playlistItemId of videoIds) {
    // FIXME
    // await gapi.client.youtube.playlistItems.insert({
    //   part: "snippet",
    //   resource: {
    //     snippet: {
    //       playlistId: playlist.id,
    //       resourceId: {
    //         kind: PLAYLIST_ITEM_RESOURCE_KIND,
    //         videoId: playlistItemId,
    //       },
    //     },
    //   },
    // });

    // TEMP
    await waitForMs(100);
  }

  setMessageCallback(
    `Created playlist ${playlistTitle} with ${videoIds.length} videos!`,
  );

  await waitForMs(PLAYLIST_CREATED_MESSAGE_TIME_MS);

  setMessageCallback(NO_OVERLAY_MESSAGE);
}

/**
 * Retrieves all of the current user's playlist data.
 * Loads from cached data when possible.
 */
export async function retrievePlaylistData(
  setMessageCallback: SetMessageCallback,
) {
  setMessageCallback("Retrieving playlist data...");
  await retrievePlaylists();

  setMessageCallback("Retrieving user data...");
  const userId = await getUserId();

  const storedData = await getUserPlaylistData(userId);
  if (storedData !== null) {
    for (const [playlistId, data] of Object.entries(storedData)) {
      if (Object.hasOwn(playlistData, playlistId)) {
        playlistData[data.playlist.id!] = data;
      }
    }
  }

  setMessageCallback("Retrieving video data...");
  await retrievePlaylistItems(setMessageCallback);

  updateVideoIds();

  setMessageCallback("Caching data...");
  await setUserPlaylistData(userId, playlistData);

  setMessageCallback(NO_OVERLAY_MESSAGE);
}

async function retrievePlaylists() {
  const playlistList = await getPaginatedItems(
    gapi.client.youtube.playlists.list,
    {
      part: PLAYLIST_PART,
      mine: true,
    },
  );
  playlistList.forEach(trimPlaylistProperties);

  playlistData = {};

  playlistList.forEach((playlist) => {
    playlistData[playlist.id!] = {
      playlist: playlist,
      // Dummy data that will be replaced later
      etag: "",
      playlistItems: [],
    };
  });
}

async function retrievePlaylistItems(setMessageCallback: SetMessageCallback) {
  const length = Object.keys(playlistData).length;
  let index = 0;
  for (const data of Object.values(playlistData)) {
    const etag = await checkPlaylistEtag(data.etag, data.playlist.id!);

    if (etag !== null) {
      setMessageCallback(
        <>
          {`Fetching items for ${index + 1} of ${length} playlists:`}
          <br />
          {data.playlist.snippet!.title!.toString()}
        </>,
      );
      const items = await getPaginatedItems(
        gapi.client.youtube.playlistItems.list,
        {
          part: PLAYLIST_ITEM_PART,
          playlistId: data.playlist.id,
        },
      );
      items.forEach(trimPlaylistItemProperties);

      data.etag = etag;
      data.playlistItems = items;
    } else {
      setMessageCallback(
        <>
          {`Getting items from cache for ${index + 1} of ${length} playlists:`}
          <br />
          {data.playlist.snippet!.title!.toString()}
        </>,
      );
    }

    index++;
  }
}

export function getPlaylistNames(): string[] {
  return Object.values(playlistData).map(
    (data) => data.playlist.snippet!.title!,
  );
}

function updateVideoIds(excludedPlaylistNames: string[] = []) {
  videoIds = getVideoIdsFromPlaylistData(playlistData, excludedPlaylistNames);
}

// Uncomment this during development, comment it any other times
// export { playlistData, videoIds };
