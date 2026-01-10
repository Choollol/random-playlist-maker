import { PrivacyStatus } from "@/lib/types/gapiTypes";
import { getRandomElements } from "@/lib/utils/arrayUtils";
import { isUserSignedIn } from "@/lib/utils/authUtils";
import {
  createPlaylistWithItems as createPlaylistWithVideos,
  DEFAULT_EXCLUDED_PLAYLIST_NAMES,
  getPaginatedItems,
} from "@/lib/utils/playlistUtils";

interface PlaylistItems {
  [key: string]: gapi.client.youtube.PlaylistItem;
}

let playlists: gapi.client.youtube.Playlist[] = [];
let playlistItems: PlaylistItems;
let videoIds: string[];

export const createRandomizedPlaylist = async (
  numPlaylistItems: number,
  privacyStatus: PrivacyStatus
) => {
  if (!videoIds?.length) {
    await retrievePlaylistItems();
  }

  const selectedVideoIds = getRandomElements(videoIds, numPlaylistItems);

  await createPlaylistWithVideos(selectedVideoIds, "zzzasdasd", privacyStatus);
};

export const retrievePlaylistItems = async () => {
  await retrievePlaylists();

  playlists = playlists.filter(
    (playlist) => !DEFAULT_EXCLUDED_PLAYLIST_NAMES.has(playlist.snippet!.title!)
  );

  playlistItems = {};

  let index = 0;
  for (const playlist of playlists) {
    if (index == 10) {
      break;
    }
    console.log(
      `Getting items for ${index + 1} of ${playlists.length} playlists: ${
        playlist.snippet?.title
      }`
    );
    const items = await getPaginatedItems(
      gapi.client.youtube.playlistItems.list,
      {
        part: "snippet, contentDetails",
        playlistId: playlist.id,
      }
    );

    for (const playlistItem of items) {
      if (
        playlistItem.id !== undefined &&
        playlistItems[playlistItem.id] === undefined
      ) {
        playlistItems[playlistItem.id] = playlistItem;
      }
    }
    index++;
  }

  videoIds = Object.entries(playlistItems).map(
    ([_, playlistItem]) => playlistItem.contentDetails!.videoId!
  );
};

export const retrievePlaylists = async () => {
  const isSignedIn = await isUserSignedIn();

  if (!isSignedIn) {
    console.log("not signed in");
    return [];
  }

  playlists = await fetchPlaylists();
};

export const fetchPlaylists = async () => {
  const playlists = await getPaginatedItems(
    gapi.client.youtube.playlists.list,
    {
      part: "snippet, contentDetails",
      mine: true,
    }
  );

  return playlists;
};
