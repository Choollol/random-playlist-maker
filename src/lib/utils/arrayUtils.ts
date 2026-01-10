import { getRandomInt } from "@/lib/utils/numberUtils";

/**
 * Swaps two elements of an array.
 */
export function swapArrayElements(
  arr: unknown[],
  index1: number,
  index2: number
) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

/**
 * Returns an array of elements randomly chosen from the given array.
 * Elements are only used once, unless the number of elements to choose is
 * greater than the size of the given array.
 *
 * @param arr The given array, is mutated.
 * @param numElements The number of elements to select.
 */
export function getRandomElements<T>(arr: T[], numElements: number): T[] {
  let lastSelectableIndex = arr.length - 1;
  const selected: T[] = [];

  while (selected.length < numElements) {
    const randomIndex = getRandomInt(0, lastSelectableIndex);

    selected.push(arr[randomIndex]);

    swapArrayElements(arr, randomIndex, lastSelectableIndex);

    lastSelectableIndex--;

    if (lastSelectableIndex === -1) {
      lastSelectableIndex = arr.length - 1;
    }
  }

  return selected;
}
