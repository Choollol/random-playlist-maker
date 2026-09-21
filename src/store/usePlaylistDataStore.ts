import { create } from "zustand";
import { combine } from "zustand/middleware";
import { PlaylistData } from "@/lib/types/playlistTypes";

interface State {
  arePlaylistsRetrieved: boolean;
  playlistData: PlaylistData;
  videoIds: string[];
}

const initialState: State = {
  arePlaylistsRetrieved: false,
  playlistData: {},
  videoIds: [],
};

function getPlaylistNamesFromData(playlistData: PlaylistData) {
  return Object.values(playlistData).map(
    (data) => data.playlist.snippet!.title!,
  );
}

export const usePlaylistDataStore = create(
  combine(initialState, (set, get) => ({
    markPlaylistsRetrieved: () => set({ arePlaylistsRetrieved: true }),
    clearPlaylistData: () => set({ playlistData: {} }),
    addPlaylistData: (id: string, data: PlaylistData[string]) =>
      set((state) => ({
        playlistData: Object.assign(state.playlistData, { [id]: data }),
      })),
    setVideoIds: (videoIds: string[]) => set({ videoIds: videoIds }),

    getPlaylistNames(): string[] {
      return getPlaylistNamesFromData(get().playlistData);
    },
    filterForExistingPlaylists(playlistNames: string[]): string[] {
      const existingPlaylistNames = new Set(
        getPlaylistNamesFromData(get().playlistData),
      );
      return playlistNames.filter((name) => existingPlaylistNames.has(name));
    },
  })),
);
