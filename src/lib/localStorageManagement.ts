import { PlaylistData } from "@/lib/types/playlistTypes";

enum LocalStorageKey {
  AllUserData = "allUserData",
}

interface AllUserData {
  [userId: string]: PlaylistData;
}

let allUserData: AllUserData;

export function getUserPlaylistData(userId: string): PlaylistData | null {
  if (allUserData === undefined) {
    loadAllData();
  }
  return allUserData[userId] ?? null;
}

export function saveUserPlaylistData(
  userId: string,
  playlistData: PlaylistData
) {
  allUserData[userId] = playlistData;

  localStorage.setItem(
    LocalStorageKey.AllUserData,
    JSON.stringify(allUserData)
  );
}

function loadAllData() {
  allUserData =
    getLocalStorageItem<AllUserData>(LocalStorageKey.AllUserData) ?? {};
}

function getLocalStorageItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item !== null ? JSON.parse(item) : item;
}
