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
  sort: null | ((a: FlattenedPlaylistItem, b: FlattenedPlaylistItem) => number);
}

export interface SearchFilters {
  doUseExcludedPlaylists: boolean;
  matchExact: boolean;
}

interface UpdateExcludePlaylistsFilterParams {
  type: "doUseExcludedPlaylists";
  value: boolean;
}

interface UpdateMatchExactFilterParams {
  type: "matchExact";
  value: boolean;
}

export type UpdateSearchFilterParams =
  | UpdateExcludePlaylistsFilterParams
  | UpdateMatchExactFilterParams;

export type UpdateSearchFilter = (params: UpdateSearchFilterParams) => void;
