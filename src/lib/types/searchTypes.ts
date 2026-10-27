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
}

interface UpdateExcludePlaylistsFilterParams {
  type: "doUseExcludedPlaylists";
  value: boolean;
}

export type UpdateFilterParams = UpdateExcludePlaylistsFilterParams;

export type UpdateFilter = (params: UpdateFilterParams) => void;
