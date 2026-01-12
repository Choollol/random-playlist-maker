export type PlaylistRequestCallback =
  | typeof gapi.client.youtube.playlists.list
  | typeof gapi.client.youtube.playlistItems.list;

/**
 * Narrows down between two types depending on the given playlist-related request callback.
 *
 * @param RequestCallbackType `gapi.client.youtube.playlists.list` or `gapi.client.youtube.playlistItems.list`.
 * @param PlaylistType Narrowed type if callback is part of the playlists API
 * @param PlaylistItemType Narrowed type if callback is part of the playlistItems API
 */
export type ConditionalPlaylistType<
  RequestCallbackType,
  PlaylistType,
  PlaylistItemType
> = RequestCallbackType extends typeof gapi.client.youtube.playlists.list
  ? PlaylistType
  : PlaylistItemType;

export enum PrivacyStatus {
  Public = "public",
  Unlisted = "unlisted",
  Private = "private",
}

export type Playlist = gapi.client.youtube.Playlist;
export type PlaylistItem = gapi.client.youtube.PlaylistItem;

export type PlaylistListParams = Parameters<
  typeof gapi.client.youtube.playlists.list
>[0];

export type PlaylistItemListParams = Parameters<
  typeof gapi.client.youtube.playlistItems.list
>[0];
