import {
  PlaylistRequestCallback,
  ConditionalPlaylistType,
  PrivacyStatus,
} from "@/lib/types/gapiTypes";
import { PLAYLIST_ITEM_RESOURCE_KIND } from "@/lib/utils/gapiUtils";

const MAX_PAGINATED_ITEM_RESULTS = 50;

export const DEFAULT_EXCLUDED_PLAYLIST_NAMES = new Set(["Liked Videos"]);

/**
 * Common API for retrieving all playlists or playlistItems
 *
 * @param requestCallback `gapi.client.youtube.playlists.list` or `gapi.client.youtube.playlistItems.list`.
 * @param requestOptions Options to pass as the argument to `requestCallback`.
 * @returns Array of items whose type should be correct based on the given callback.
 */
export const getPaginatedItems = async <
  RequestCallback extends PlaylistRequestCallback,
  RequestOptions extends NonNullable<
    ConditionalPlaylistType<
      RequestCallback,
      Parameters<typeof gapi.client.youtube.playlists.list>[0],
      Parameters<typeof gapi.client.youtube.playlistItems.list>[0]
    >
  >
>(
  requestCallback: RequestCallback,
  requestOptions: RequestOptions
) => {
  type ResponseData = ConditionalPlaylistType<
    RequestCallback,
    gapi.client.youtube.PlaylistListResponse,
    gapi.client.youtube.PlaylistItemListResponse
  >;

  let items: Array<
    ConditionalPlaylistType<
      RequestCallback,
      gapi.client.youtube.Playlist,
      gapi.client.youtube.PlaylistItem
    >
  > = [];

  let pageToken = undefined;
  do {
    const response = await requestCallback({
      ...requestOptions,
      pageToken: pageToken,
      maxResults: MAX_PAGINATED_ITEM_RESULTS,
    });

    const data: ResponseData = JSON.parse(response.body);
    pageToken = data.nextPageToken;

    if (data.items !== undefined) {
      items = items.concat(data.items as typeof items);
    }
  } while (pageToken !== undefined);

  return items;
};

export async function createPlaylistWithItems(
  videoIds: string[],
  playlistTitle: string,
  privacyStatus: PrivacyStatus
): Promise<gapi.client.youtube.Playlist> {
  const response = await gapi.client.youtube.playlists.insert({
    part: "id, snippet, status",
    resource: {
      snippet: {
        title: playlistTitle,
      },
      status: {
        privacyStatus: privacyStatus,
      },
    },
  });
  const playlist: gapi.client.youtube.Playlist = JSON.parse(response.body);
  console.log("Created playlist", playlist);

  for (const playlistItemId of videoIds) {
    console.log(
      `Adding video with id ${playlistItemId} to playlist with id ${playlist.id}`
    );
    await gapi.client.youtube.playlistItems.insert({
      part: "snippet",
      resource: {
        snippet: {
          playlistId: playlist.id,
          resourceId: {
            kind: PLAYLIST_ITEM_RESOURCE_KIND,
            videoId: playlistItemId,
          },
        },
      },
    });
  }

  console.log(
    `Created playlist ${playlistTitle} with ${videoIds.length} items`
  );

  return playlist;
}
