"use client";

import { CollectionKey, loadFromDatabase, saveToDatabase } from "@/lib/dbClient";
import { UserId } from "@/lib/types/authTypes";
import { PickNonFunctions } from "@/lib/types/utilTypes";
import { FormData } from "@/store/useUserPreferencesStore";

export interface UserPreferences {
  formData: Partial<PickNonFunctions<FormData>>;
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
