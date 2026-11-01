import { debounce, Stack, TextField, Typography } from "@mui/material";
import Fuse from "fuse.js";
import { ComponentProps, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { InfiniteScrollList } from "@/components/_common/InfiniteScrollList";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { PlaylistSearchResultItem } from "@/components/search/PlaylistSearchResultItem";
import { SearchFiltersDropdown } from "@/components/search/SearchFiltersDropdown";
import { SearchInput } from "@/components/search/SearchInput";
import { SortSelect } from "@/components/search/SortSelect";
import { createStyleGroup } from "@/lib/styling/styling";
import { PlaylistData } from "@/lib/types/playlistTypes";
import {
  FlattenedPlaylistItem,
  UpdateSearchFilter,
  UpdateSearchFilterParams,
} from "@/lib/types/searchTypes";
import {
  filterOutExcludedPlaylists,
  getSortCallback,
  searchKeys,
  SortOptionId,
} from "@/lib/utils/searchUtils";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { useUserPreferencesStore } from "@/store/useUserPreferencesStore";

const styles = createStyleGroup({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  searchResultsContainer: {
    width: "100%",
  },
  loadingSpinner: {
    marginTop: 10,
  },
});

const SEARCH_THRESHOLD = 0.3;

function flattenPlaylistData(playlistData: PlaylistData): FlattenedPlaylistItem[] {
  const videoIdToItem = new Map<string, FlattenedPlaylistItem>();
  for (const playlist of Object.values(playlistData)) {
    const playlistTitle = playlist.playlist.snippet!.title!;
    for (const playlistItem of playlist.playlistItems) {
      // Skip private videos that user can't access
      if (playlistItem.snippet?.videoOwnerChannelTitle === undefined) {
        continue;
      }

      const videoId = playlistItem.contentDetails!.videoId!;
      if (!videoIdToItem.has(videoId)) {
        videoIdToItem.set(videoId, {
          videoId,
          playlistTitles: [],
          videoTitle: playlistItem.snippet!.title!,
          videoDescription: playlistItem.snippet!.description!,
          channelTitle: playlistItem.snippet!.videoOwnerChannelTitle!,
        } satisfies FlattenedPlaylistItem);
      }
      let item = videoIdToItem.get(videoId)!;
      item.playlistTitles.push(playlistTitle);
    }
  }
  return Array.from(videoIdToItem.values());
}

export const PlaylistSearch = () => {
  const [searchResults, setSearchResults] = useState<FlattenedPlaylistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { formData, searchSortId, setSearchSort, searchFilters, setSearchFilters } =
    useUserPreferencesStore(
      useShallow(({ formData, searchSortId, setSearchSort, searchFilters, setSearchFilters }) => ({
        formData,
        searchSortId,
        setSearchSort,
        searchFilters,
        setSearchFilters,
      })),
    );

  const updateSearchFilter: UpdateSearchFilter = (params: UpdateSearchFilterParams) => {
    if (params.type === "doUseExcludedPlaylists") {
      setSearchFilters({ ...searchFilters, doUseExcludedPlaylists: params.value });
    }
  };

  const [playlistData, arePlaylistItemsRetrieved] = usePlaylistDataStore(
    useShallow((state) => [state.playlistData, state.arePlaylistItemsRetrieved]),
  );

  const searchEngine = useMemo(() => {
    return new Fuse(flattenPlaylistData(playlistData), {
      keys: searchKeys.slice(),
      threshold: SEARCH_THRESHOLD,
    });
  }, [playlistData]);

  const searchDebounced = useMemo(
    () =>
      debounce((query) => {
        const results = searchEngine.search(query).map(({ item }) => item);
        setSearchResults(results);
        setIsLoading(false);
      }, 300),
    [searchEngine],
  );

  const handleInputChange: ComponentProps<typeof TextField>["onChange"] = (event) => {
    const query = event.currentTarget.value;
    setIsLoading(true);
    searchDebounced(query);
  };

  const handleSortChange: ComponentProps<typeof SortSelect>["onChange"] = (event) => {
    const optionId = event.target.value as SortOptionId;
    setSearchSort(optionId);
  };

  const searchResultsProcessed = useMemo(() => {
    let result = searchResults;
    const sortCallback = getSortCallback(searchSortId);
    if (sortCallback !== null) {
      result = searchResults.toSorted(sortCallback);
    }
    if (searchFilters.doUseExcludedPlaylists && formData.excludedPlaylistNames) {
      result = filterOutExcludedPlaylists(result, formData.excludedPlaylistNames);
    }
    return result;
  }, [searchResults, searchSortId, searchFilters, formData.excludedPlaylistNames]);

  return (
    <Stack sx={styles.container} spacing={1}>
      <SearchInput onChange={handleInputChange} disabled={!arePlaylistItemsRetrieved} />

      <Stack direction="row">
        <SortSelect value={searchSortId} onChange={handleSortChange} />
        <SearchFiltersDropdown
          searchFilters={searchFilters}
          updateSearchFilter={updateSearchFilter}
        />
      </Stack>

      <Typography variant="caption">
        {isLoading || !arePlaylistItemsRetrieved
          ? "Loading..."
          : `Showing ${searchResultsProcessed.length} results`}
      </Typography>

      {!arePlaylistItemsRetrieved ? null : (
        <div style={styles.searchResultsContainer}>
          <InfiniteScrollList
            items={searchResultsProcessed}
            showMoreCount={50}
            renderItem={(item) => <PlaylistSearchResultItem key={item.videoId} item={item} />}
          />
        </div>
      )}

      <ScrollToTopButton />
    </Stack>
  );
};
