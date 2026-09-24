import { localCacheGet, localCacheSet } from "@/lib/localCache";
import { PlaylistData } from "@/lib/types/playlistTypes";
import { UserId } from "@/lib/utils/authUtils";

enum LocalStorageKey {
  AllUserData = "allUserData",
}

interface AllUserData {
  [userId: UserId]: PlaylistData;
}

let allUserData: AllUserData;

export async function getStoredPlaylistData(userId: UserId): Promise<PlaylistData | null> {
  if (allUserData === undefined) {
    await loadAllData();
  }
  return allUserData[userId] ?? null;
}

export async function setUserPlaylistData(userId: UserId, playlistData: PlaylistData) {
  allUserData[userId] = playlistData;

  await localCacheSet(LocalStorageKey.AllUserData, allUserData);
}

async function loadAllData() {
  allUserData = (await localCacheGet<AllUserData>(LocalStorageKey.AllUserData)) ?? {};
}
