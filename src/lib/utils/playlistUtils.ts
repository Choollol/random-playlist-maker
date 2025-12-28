import {
  PlaylistRequestCallback,
  ConditionalPlaylistType,
} from "@/lib/types/gapiTypes";
import { isUserSignedIn } from "@/lib/utils/authUtils";

const MAX_PAGINATED_ITEM_RESULTS = 50;

export const getPlaylists = async () => {
  const isSignedIn = await isUserSignedIn();

  if (!isSignedIn) {
    console.log("not signed in");
    return;
  }

  const playlists = await getPaginatedItems(
    gapi.client.youtube.playlists.list,
    {
      part: "snippet",
      mine: true,
    }
  );

  return playlists;
};

/**
 * Common API for retrieving all playlists or playlistItems
 *
 * @param requestCallback `gapi.client.youtube.playlists.list` or `gapi.client.youtube.playlistItems.list`.
 * @param requestOptions Options to pass as the argument to `requestCallback`.
 * @returns Array of items whose type should be correct based on the given callback.
 */
const getPaginatedItems = async <
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
