import { Search } from "@mui/icons-material";
import { debounce, InputAdornment, List, Stack, TextField, Typography } from "@mui/material";
import Fuse, { FuseResult } from "fuse.js";
import { ComponentProps, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { PlaylistSearchResultItem } from "@/components/PlaylistSearchResultItem";
import { createStyleGroup } from "@/lib/styling/styling";
import { PlaylistData } from "@/lib/types/playlistTypes";
import { FlattenedPlaylistItem } from "@/lib/types/searchTypes";
import { searchKeys } from "@/lib/utils/searchUtils";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";

const styles = createStyleGroup({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  inputField: {
    width: "100%",
  },
  searchResultsContainer: {
    width: "100%",
  },
});

const SEARCH_THRESHOLD = 0.3;
const MAX_SEARCH_RESULT_COUNT = 50;

function flattenPlaylistData(playlistData: PlaylistData): FlattenedPlaylistItem[] {
  const videoIdToItem = new Map<string, FlattenedPlaylistItem>();
  for (const playlist of Object.values(playlistData)) {
    const playlistTitle = playlist.playlist.snippet!.title!;
    for (const playlistItem of playlist.playlistItems) {
      const videoId = playlistItem.contentDetails!.videoId!;
      if (!videoIdToItem.has(videoId)) {
        videoIdToItem.set(videoId, {
          videoId: playlistItem.id!,
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
  const [searchResults, setSearchResults] = useState<FuseResult<FlattenedPlaylistItem>[]>([]);

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
    () => debounce((query) => setSearchResults(searchEngine.search(query)), 300),
    [searchEngine],
  );

  const handleChange: ComponentProps<typeof TextField>["onChange"] = (event) => {
    const query = event.currentTarget.value;
    searchDebounced(query);
  };

  return (
    <Stack sx={styles.container} spacing={1}>
      <TextField
        sx={styles.inputField}
        onChange={handleChange}
        placeholder={
          arePlaylistItemsRetrieved
            ? "Search videos in your playlists"
            : "Search will be available once your data is retrieved"
        }
        disabled={!arePlaylistItemsRetrieved}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />
      <Typography variant="caption">
        Showing {Math.min(searchResults.length, MAX_SEARCH_RESULT_COUNT)} of {searchResults.length}{" "}
        results
      </Typography>

      <List sx={styles.searchResultsContainer}>
        {searchResults.slice(0, MAX_SEARCH_RESULT_COUNT).map(({ item }) => {
          return <PlaylistSearchResultItem key={item.videoId} item={item} />;
        })}
      </List>
    </Stack>
  );
};
