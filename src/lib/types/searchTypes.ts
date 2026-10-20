import { searchKeys } from "@/lib/utils/searchUtils";

export type FlattenedPlaylistItem = Record<
  Exclude<(typeof searchKeys)[number], "playlistTitles">,
  string
> & {
  playlistTitles: string[];
  videoId: string;
};

export interface SortOption {
  name: string;
  sort: (a: FlattenedPlaylistItem, b: FlattenedPlaylistItem) => number;
}
