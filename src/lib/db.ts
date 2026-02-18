import { catchUnrecoverableError } from "@/lib/error";
import { IDBPDatabase, openDB } from "idb";

type DBKey = IDBKeyRange | IDBValidKey;

let db: IDBPDatabase<unknown>;

/**
 * @returns `true` if success, `false` if failure
 */
export const initDB = catchUnrecoverableError(
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

export async function dbGet<T>(key: DBKey): Promise<T> {
  return db.get("keyval", key);
}
export async function dbSet(key: DBKey, val: unknown) {
  return db.put("keyval", val, key);
}
