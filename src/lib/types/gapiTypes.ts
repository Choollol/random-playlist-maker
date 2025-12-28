export type PlaylistRequestCallback =
  | typeof gapi.client.youtube.playlists.list
  | typeof gapi.client.youtube.playlistItems.list;

/**
 * Narrows down between two types depending on the given playlist-related request callback.
 *
 * @param RequestCallbackType A function belonging to `gapi.client.youtube.playlists` or
 *                            `gapi.client.youtube.playlistItems` (list, update, insert, delete).
 * @param PlaylistType Narrowed type if callback is part of the playlists API
 * @param PlaylistItemType Narrowed type if callback is part of the playlistItems API
 */
export type ConditionalPlaylistType<
  RequestCallbackType,
  PlaylistType,
  PlaylistItemType
> = RequestCallbackType extends keyof typeof gapi.client.youtube.playlists
  ? PlaylistType
  : PlaylistItemType;
