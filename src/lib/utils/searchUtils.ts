import { SortOption } from "@/lib/types/searchTypes";

export const searchKeys = [
  "playlistTitles",
  "videoTitle",
  "videoDescription",
  "channelTitle",
] as const;

export const sortOptions = {
  default: {
    name: "Default View",
    sort: null,
  },
  "channel-title-ascending": {
    name: "Channel Name A-Z",
    sort: (a, b) => a.channelTitle.localeCompare(b.channelTitle),
  },
  "channel-title-descending": {
    name: "Channel Name Z-A",
    sort: (a, b) => b.channelTitle.localeCompare(a.channelTitle),
  },
  "video-title-ascending": {
    name: "Video Title A-Z",
    sort: (a, b) => a.videoTitle.localeCompare(b.videoTitle),
  },
  "video-title-descending": {
    name: "Video Title Z-A",
    sort: (a, b) => b.videoTitle.localeCompare(a.videoTitle),
  },
  "playlist-count-descending": {
    name: "# Playlists Descending",
    sort: (a, b) => b.playlistTitles.length - a.playlistTitles.length,
  },
  "playlist-count-ascending": {
    name: "# Playlists Ascending",
    sort: (a, b) => a.playlistTitles.length - b.playlistTitles.length,
  },
} as const satisfies Record<string, SortOption>;

export type SortOptionId = keyof typeof sortOptions;

export const DEFAULT_SORT_OPTION_ID: SortOptionId = "default";

export function getSortCallback(id: SortOptionId): SortOption["sort"] {
  return sortOptions[id].sort;
}
