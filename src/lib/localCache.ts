import { IDBPDatabase, openDB } from "idb";

import { catchUnrecoverableError } from "@/lib/error";

type DBKey = IDBKeyRange | IDBValidKey;

let db: IDBPDatabase<unknown>;

/**
 * @returns `true` if success, `false` if failure
 */
export const initLocalCache = catchUnrecoverableError(
  {
    message:
      "Something went wrong while initializing cache (Indexed DB). Please try again or reload the page.",
    retryButtonText: "Try Again",
    failureReturnValue: false,
  },
  async () => {
    db = await openDB("keyval-store", 1, {
      upgrade(db) {
        db.createObjectStore("keyval");
      },
    });
    return true;
  },
);

export async function localCacheGet<T>(key: DBKey): Promise<T> {
  return db.get("keyval", key);
}
export async function localCacheSet(key: DBKey, val: unknown) {
  return db.put("keyval", val, key);
}
