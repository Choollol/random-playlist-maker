import {
  PlaylistRequestCallback,
  ConditionalPlaylistType,
  PrivacyStatus,
  Playlist,
  PlaylistItem,
  PlaylistListParams,
  PlaylistItemListParams,
} from "@/lib/types/gapiTypes";
import { PlaylistData } from "@/lib/types/playlistTypes";
import {
  addArrayElementsToSet,
  createSetFromArray,
} from "@/lib/utils/collectionUtils";
import { PLAYLIST_ITEM_RESOURCE_KIND } from "@/lib/utils/gapiUtils";

export const MAX_PAGINATED_ITEM_RESULTS = 50;

export const PLAYLIST_PART = "snippet";
export const PLAYLIST_ITEM_PART = "snippet, contentDetails";

export const MIN_VIDEO_COUNT = 1;
export const MAX_VIDEO_COUNT = 50;
export const DEFAULT_VIDEO_COUNT = 20;

export const DEFAULT_PRIVACY_LEVEL: PrivacyStatus = PrivacyStatus.Public;

export const DEFAULT_PLAYLIST_TITLE = "My PickSome";

/**
 * Common API for retrieving all playlists or playlistItems
 *
 * @param requestCallback `gapi.client.youtube.playlists.list` or `gapi.client.youtube.playlistItems.list`.
 * @param trimItemCallback Callback to trim the properties (delete unused) of each item.
 * @param requestOptions Options to pass as the argument to `requestCallback`.
 * @returns Array of items whose type should be correct based on the given callback.
 */
export async function getPaginatedItems<
  RequestCallback extends PlaylistRequestCallback,
  ResourceType extends ConditionalPlaylistType<
    RequestCallback,
    Playlist,
    PlaylistItem
  >,
  RequestOptions extends NonNullable<
    ConditionalPlaylistType<
      RequestCallback,
      PlaylistListParams,
      PlaylistItemListParams
    >
  >,
  ResponseData extends ConditionalPlaylistType<
    RequestCallback,
    gapi.client.youtube.PlaylistListResponse,
    gapi.client.youtube.PlaylistItemListResponse
  >
>(requestCallback: RequestCallback, requestOptions: RequestOptions) {
  let items: ResourceType[] = [];

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
}

/**
 * Creates a playlist for the auth user with the given videos.
 */
export async function createPlaylistWithVideos(
  videoIds: string[],
  playlistTitle: string,
  privacyStatus: PrivacyStatus
) {
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
  const playlist: Playlist = JSON.parse(response.body);
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
}

export function getVideoIdsFromPlaylistData(
  playlistData: PlaylistData,
  excludedPlaylistNames: string[]
) {
  const excludedPlaylistNamesSet = createSetFromArray(excludedPlaylistNames);
  const uniqueVideoIds = new Set<string>();
  for (const data of Object.values(playlistData)) {
    const playlistTitle = data.playlist.snippet!.title!;
    if (!excludedPlaylistNamesSet.has(playlistTitle)) {
      addArrayElementsToSet(
        uniqueVideoIds,
        data.playlistItems.map(
          (playlistItem) => playlistItem.contentDetails!.videoId!
        )
      );
    } else {
      console.log(`Excluding playlist ${playlistTitle}`);
    }
  }
  return Array.from(uniqueVideoIds);
}

/**
 * Deletes unnnecessary playlist properties in-place.
 */
export function trimPlaylistProperties(playlist: Playlist) {
  delete playlist.kind;
  delete playlist.snippet?.publishedAt;
  delete playlist.snippet?.channelId;
  delete playlist.snippet?.channelTitle;
  delete playlist.snippet?.description;
}

/**
 * Deletes unnnecessary playlist item properties in-place.
 */
export function trimPlaylistItemProperties(playlistItem: PlaylistItem) {
  delete playlistItem.kind;
  delete playlistItem.snippet?.channelId;
  delete playlistItem.snippet?.channelTitle;
  delete playlistItem.snippet?.description;
  delete playlistItem.snippet?.playlistId;
  delete playlistItem.snippet?.position;
  delete playlistItem.snippet?.publishedAt;
  delete playlistItem.snippet?.resourceId?.kind;
  delete playlistItem.snippet?.resourceId?.channelId;
  delete playlistItem.snippet?.resourceId?.playlistId;
  delete playlistItem.snippet?.videoOwnerChannelId;
  delete playlistItem.snippet?.videoOwnerChannelTitle;
}

/**
 * Given an etag, check if a playlist's data has changed on YouTube's side.
 *
 * @param cachedEtag The cached etag.
 * @param playlistId The ID of the playlist being checked.
 * @returns `null` if the playlist hasn't changed, the new etag otherwise.
 */
export async function checkPlaylistEtag(
  cachedEtag: string,
  playlistId: string
): Promise<string | null> {
  const response = await gapi.client.request({
    path: "https://www.googleapis.com/youtube/v3/playlists",
    method: "GET",
    params: { part: "id", id: playlistId },
    headers: {
      "If-None-Match": cachedEtag,
    },
  });
  if (response.status === 304) {
    return null;
  }
  const body: gapi.client.youtube.PlaylistListResponse = JSON.parse(
    response.body
  );
  const newEtag = body.etag!;
  return newEtag;
}
