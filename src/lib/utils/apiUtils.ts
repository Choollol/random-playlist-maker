import { waitForMs } from "@/lib/utils/miscUtils";

const BACKOFF_START_MS = 1000;
const BACKOFF_LIMIT_MS = 8000;
const BACKOFF_GROWTH_RATE = 2;

/**
 * Retries given function on error with exponential backoff until limit.
 *
 */
export async function withRetries<T>(callback: () => T | Promise<T>) {
  let backoffMs = BACKOFF_START_MS;
  while (true) {
    try {
      const result = callback();
      if (result instanceof Promise) {
        return await result;
      }
      return result;
    } catch (error) {
      if (backoffMs > BACKOFF_LIMIT_MS) {
        throw error;
      }
      await waitForMs(backoffMs);
      backoffMs *= BACKOFF_GROWTH_RATE;
    }
  }
}
