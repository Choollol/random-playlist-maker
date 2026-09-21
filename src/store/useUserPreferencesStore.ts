import { showError } from "@/lib/error";
import { CreateRandomizedPlaylistOptions } from "@/lib/playlistManagement";
import {
  getUserPreferencesFromDb,
  saveUserPreferencesToDb,
  UserPreferences,
} from "@/lib/userPreferences";
import { getUserId } from "@/lib/utils/authUtils";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { debounce } from "@mui/material";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export type FormData = CreateRandomizedPlaylistOptions;

type State = UserPreferences;

const saveUserPreferences = debounce(
  async (formData: UserPreferences["formData"]) => {
    const userId = await getUserId();
    try {
      await saveUserPreferencesToDb(userId, { formData });
    } catch (error) {
      showError({
        type: "recoverable",
        message: `Something went wrong while saving your preferences: ${error}`,
        error,
      });
    }
  },
  1000,
);

const initialState: State = { formData: {} };

export const useUserPreferencesStore = create(
  combine(initialState, (set) => ({
    setUserPreferences: (formData: UserPreferences["formData"]) => {
      set({ formData });
      saveUserPreferences(formData);
    },
    loadUserPreferences: async () => {
      const userId = await getUserId();
      try {
        const preferences = await getUserPreferencesFromDb(userId);
        set({ formData: preferences.formData });
        return true;
      } catch (error) {
        showError({
          type: "recoverable",
          message: `Something went wrong while loading your preferences: ${error}`,
          error,
        });
        return false;
      }
    },
  })),
);
