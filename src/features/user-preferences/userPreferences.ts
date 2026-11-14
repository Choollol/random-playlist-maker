"use client";

import { UserId } from "@/common/lib/auth/authTypes";
import { CollectionKey, loadFromDatabase, saveToDatabase } from "@/common/lib/db/dbClient";
import { PickNonFunctions } from "@/common/lib/types/utilTypes";
import { SearchFilters } from "@/features/search-playlists/searchTypes";
import { SortOptionId } from "@/features/search-playlists/searchUtils";
import { FormData } from "@/features/user-preferences/useUserPreferencesStore";

export interface UserPreferences {
  formData: Partial<PickNonFunctions<FormData>>;
  searchSortId: SortOptionId;
  searchFilters: SearchFilters;
}

export async function getUserPreferencesFromDb(userId: UserId): Promise<UserPreferences> {
  const response = await loadFromDatabase(CollectionKey.userData, userId);
  return response.data()?.preferences || { formData: {} };
}

/**
 * @throws
 */
export async function saveUserPreferencesToDb(userId: UserId, data: UserPreferences) {
  await saveToDatabase(CollectionKey.userData, userId, { preferences: data });
}
