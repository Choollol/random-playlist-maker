export const BUG_REPORT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScIsd9eAcAM2EcBx9QRpzTnWWsB2NuZyRhtADxzdQw0mvKmgw/viewform";

/**
 * @param min Inclusive
 * @param max Exclusive
 */
export function getRandomRange(min: number, max: number): number {
  return getRandomInt(min, max - 1);
}

/**
 * @param min Inclusive
 * @param max Inclusive
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Returns a promise that resolves after a given number of milliseconds.
 *
 * @param waitTimeMs Time to wait in milliseconds.
 */
export function waitForMs(waitTimeMs: number) {
  return new Promise((res) => setTimeout(res, waitTimeMs));
}
