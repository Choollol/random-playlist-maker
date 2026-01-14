import {
  getUserPlaylistData,
  setUserPlaylistData,
} from "@/lib/storageManagement";
import { PrivacyStatus } from "@/lib/types/gapiTypes";
import { PlaylistData } from "@/lib/types/playlistTypes";
import { getRandomElements } from "@/lib/utils/collectionUtils";
import { getUserId, isUserSignedIn } from "@/lib/utils/authUtils";
import {
  checkPlaylistEtag,
  createPlaylistWithVideos,
  getPaginatedItems,
  getVideoIdsFromPlaylistData,
  PLAYLIST_ITEM_PART,
  PLAYLIST_PART,
  trimPlaylistItemProperties,
  trimPlaylistProperties,
} from "@/lib/utils/playlistUtils";

export interface CreateRandomizedPlaylistOptions {
  playlistTitle: string;
  numPlaylistItems: number;
  privacyStatus: PrivacyStatus;
  excludedPlaylistNames: string[];
}

let playlistData: PlaylistData;
let videoIds: string[];

export async function createRandomizedPlaylist({
  playlistTitle,
  numPlaylistItems,
  privacyStatus,
  excludedPlaylistNames,
}: CreateRandomizedPlaylistOptions) {
  const isSignedIn = await isUserSignedIn();

  if (!isSignedIn) {
    console.log("not signed in");
    return [];
  }

  if (excludedPlaylistNames.length > 0) {
    updateVideoIds(excludedPlaylistNames);
  }

  const selectedVideoIds = getRandomElements(videoIds, numPlaylistItems);

  await createPlaylistWithVideos(
    selectedVideoIds,
    playlistTitle,
    privacyStatus
  );
}

/**
 * Retrieves all of the current user's playlist data.
 * Loads from cached data when possible.
 */
export async function retrievePlaylistData() {
  await retrievePlaylists();

  const userId = await getUserId();

  const storedData = await getUserPlaylistData(userId);
  if (storedData !== null) {
    for (const [playlistId, data] of Object.entries(storedData)) {
      if (Object.hasOwn(playlistData, playlistId)) {
        playlistData[data.playlist.id!] = data;
      }
    }
  }

  await retreivePlaylistItems();

  updateVideoIds();

  await setUserPlaylistData(userId, playlistData);

  console.log("Finished retrieving playlist data!");
}

async function retrievePlaylists() {
  const playlistList = await getPaginatedItems(
    gapi.client.youtube.playlists.list,
    {
      part: PLAYLIST_PART,
      mine: true,
    }
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

async function retreivePlaylistItems() {
  const length = Object.keys(playlistData).length;
  let index = 0;
  for (const data of Object.values(playlistData)) {
    const etag = await checkPlaylistEtag(data.etag, data.playlist.id!);

    if (etag !== null) {
      console.log(
        `Fetching items for ${index + 1} of ${length} playlists: ${
          data.playlist.snippet?.title
        }`
      );
      const items = await getPaginatedItems(
        gapi.client.youtube.playlistItems.list,
        {
          part: PLAYLIST_ITEM_PART,
          playlistId: data.playlist.id,
        }
      );
      items.forEach(trimPlaylistItemProperties);

      data.etag = etag;
      data.playlistItems = items;
    } else {
      console.log(
        `Getting items from cache for ${index + 1} of ${length} playlists: ${
          data.playlist.snippet?.title
        }`
      );
    }

    index++;
  }
}

export function getPlaylistNames(): string[] {
  return Object.values(playlistData).map(
    (data) => data.playlist.snippet!.title!
  );
}

function updateVideoIds(excludedPlaylistNames: string[] = []) {
  videoIds = getVideoIdsFromPlaylistData(playlistData, excludedPlaylistNames);
}

// Uncomment this during development, comment it any other times
// export { playlistData, videoIds };
