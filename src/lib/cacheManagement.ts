import { localCacheGet, localCacheSet } from "@/lib/localCache";
import { PlaylistData } from "@/lib/types/playlistTypes";
import { UserId } from "@/lib/utils/authUtils";

enum LocalStorageKey {
  AllUserData = "allUserData",
}

interface CachedPlaylistData {
  playlistData: PlaylistData;
  version: number;
}

interface AllUserData {
  [userId: UserId]: CachedPlaylistData;
}

export const CACHE_CURRENT_VERSION = 1;

let allUserData: AllUserData;

export async function getStoredPlaylistData(userId: UserId): Promise<CachedPlaylistData | null> {
  if (allUserData === undefined) {
    await loadAllData();
  }
  return allUserData[userId] ?? null;
}

export async function setUserPlaylistData(userId: UserId, playlistData: PlaylistData) {
  if (Object.keys(playlistData).length === 0) {
    return;
  }
  allUserData[userId] = { playlistData, version: CACHE_CURRENT_VERSION };

  await localCacheSet(LocalStorageKey.AllUserData, allUserData);
}

export function isCacheVersionStale(cachedVersion: number | undefined) {
  return cachedVersion !== CACHE_CURRENT_VERSION;
}

async function loadAllData() {
  allUserData = (await localCacheGet<AllUserData>(LocalStorageKey.AllUserData)) ?? {};
}
