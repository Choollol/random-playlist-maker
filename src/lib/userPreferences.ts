"use client";

import { CollectionKey, loadFromDatabase, saveToDatabase } from "@/lib/dbClient";
import { UserId } from "@/lib/types/authTypes";
import { SearchFilters } from "@/lib/types/searchTypes";
import { PickNonFunctions } from "@/lib/types/utilTypes";
import { SortOptionId } from "@/lib/utils/searchUtils";
import { FormData } from "@/store/useUserPreferencesStore";

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
