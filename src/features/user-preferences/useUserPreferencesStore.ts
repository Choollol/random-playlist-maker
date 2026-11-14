import { debounce } from "@mui/material";
import { create } from "zustand";
import { combine } from "zustand/middleware";

import { showError } from "@/common/lib/error";
import { CreateRandomizedPlaylistOptions } from "@/common/lib/playlist-management/playlistManagement";
import { useInitializationStateStore } from "@/common/store/useInitializationStateStore";
import { useSessionStore } from "@/common/store/useSessionStore";
import { DEFAULT_SORT_OPTION_ID } from "@/features/search-playlists/searchUtils";
import {
  getUserPreferencesFromDb,
  saveUserPreferencesToDb,
  UserPreferences,
} from "@/features/user-preferences/userPreferences";

export type FormData = CreateRandomizedPlaylistOptions;

type State = UserPreferences & {
  isPending: boolean;
};

function pickPreferences({ formData, searchSortId, searchFilters }: State): UserPreferences {
  return { formData, searchSortId, searchFilters };
}

const saveUserPreferences = async (userPreferences: UserPreferences, onSaved?: () => void) => {
  const userId = useSessionStore.getState().getUserId();
  try {
    await saveUserPreferencesToDb(userId, userPreferences);
  } catch (error) {
    showError({
      type: "recoverable",
      message: `Something went wrong while saving your preferences: ${error}`,
      error,
    });
  } finally {
    onSaved?.();
  }
};

const saveUserPreferencesDebounced = debounce(saveUserPreferences, 1000);

const initialState: State = {
  formData: {},
  searchSortId: DEFAULT_SORT_OPTION_ID,
  searchFilters: {
    doUseExcludedPlaylists: false,
    matchExact: false,
  },
  isPending: false,
};

export const useUserPreferencesStore = create(
  combine(initialState, (set, get) => {
    const saveDebounced = () => {
      set({ isPending: true });
      if (useInitializationStateStore.getState().isDatabaseInitialized) {
        saveUserPreferencesDebounced(pickPreferences(get()), () => set({ isPending: false }));
      }
    };

    return {
      saveUserPreferences: () => {
        set({ isPending: true });
        saveUserPreferences(pickPreferences(get()), () => set({ isPending: false }));
      },
      loadUserPreferences: async () => {
        set({ isPending: true });
        const userId = useSessionStore.getState().getUserId();
        try {
          const preferences = await getUserPreferencesFromDb(userId);
          set({
            formData: preferences.formData,
            searchSortId: preferences.searchSortId,
            searchFilters: preferences.searchFilters,
          });
          return true;
        } catch (error) {
          showError({
            type: "recoverable",
            message: `Something went wrong while loading your preferences: ${error}`,
            error,
          });
          return false;
        } finally {
          set({ isPending: false });
        }
      },

      setFormData: (formData: UserPreferences["formData"]) => {
        set({ formData });
        saveDebounced();
      },
      setSearchSort: (searchSortId: UserPreferences["searchSortId"]) => {
        set({ searchSortId });
        saveDebounced();
      },
      setSearchFilters: (searchFilters: UserPreferences["searchFilters"]) => {
        set({ searchFilters });
        saveDebounced();
      },
    };
  }),
);
