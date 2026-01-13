import { IDBPDatabase, openDB } from "idb";

type DBKey = IDBKeyRange | IDBValidKey;

let db: IDBPDatabase<unknown>;

export async function initDB() {
  db = await openDB("keyval-store", 1, {
    upgrade(db) {
      db.createObjectStore("keyval");
    },
  });
}

export async function dbGet<T>(key: DBKey): Promise<T> {
  return db.get("keyval", key);
}
export async function dbSet(key: DBKey, val: unknown) {
  return db.put("keyval", val, key);
}
