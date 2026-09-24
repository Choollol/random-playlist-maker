import { debounce } from "@mui/material";
import { create } from "zustand";
import { combine } from "zustand/middleware";

import { showError } from "@/lib/error";
import { CreateRandomizedPlaylistOptions } from "@/lib/playlistManagement";
import {
  getUserPreferencesFromDb,
  saveUserPreferencesToDb,
  UserPreferences,
} from "@/lib/userPreferences";
import { getUserId } from "@/lib/utils/authUtils";

export type FormData = CreateRandomizedPlaylistOptions;

type State = UserPreferences & {
  isPending: boolean;
};

const saveUserPreferences = async (formData: UserPreferences["formData"], onSaved?: () => void) => {
  const userId = await getUserId();
  try {
    await saveUserPreferencesToDb(userId, { formData });
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

const initialState: State = { formData: {}, isPending: false };

export const useUserPreferencesStore = create(
  combine(initialState, (set, get) => ({
    saveUserPreferences: () => {
      set({ isPending: true });
      saveUserPreferences(get().formData, () => set({ isPending: false }));
    },
    loadUserPreferences: async () => {
      set({ isPending: true });
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
      } finally {
        set({ isPending: false });
      }
    },
    setFormData: (formData: UserPreferences["formData"]) => {
      set({ formData, isPending: true });
      saveUserPreferencesDebounced(formData, () => set({ isPending: false }));
    },
  })),
);
