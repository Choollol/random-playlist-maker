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

type UpdateFilterParams<Type extends string, Value> = {
  type: Type;
  value: Value;
};

type UpdateExcludePlaylistsFilterParams = UpdateFilterParams<"doUseExcludedPlaylists", boolean>;

type UpdateMatchExactFilterParams = UpdateFilterParams<"matchExact", boolean>;

export type UpdateSearchFilterParams =
  | UpdateExcludePlaylistsFilterParams
  | UpdateMatchExactFilterParams;

export type UpdateSearchFilter = (params: UpdateSearchFilterParams) => void;
