import { dbGet, dbSet } from "@/lib/db";
import { PlaylistData } from "@/lib/types/playlistTypes";

enum LocalStorageKey {
  AllUserData = "allUserData",
}

interface AllUserData {
  [userId: string]: PlaylistData;
}

let allUserData: AllUserData;

export async function getUserPlaylistData(userId: string): Promise<PlaylistData | null> {
  if (allUserData === undefined) {
    await loadAllData();
  }
  return allUserData[userId] ?? null;
}

export async function setUserPlaylistData(
  userId: string,
  playlistData: PlaylistData
) {
  allUserData[userId] = playlistData;

  await dbSet(LocalStorageKey.AllUserData, allUserData);
}

async function loadAllData() {
  allUserData = await dbGet<AllUserData>(LocalStorageKey.AllUserData) ?? {};
}