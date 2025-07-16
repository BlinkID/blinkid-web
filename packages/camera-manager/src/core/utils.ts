/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Gets the average of an array of numbers.
 *
 * @param arr - The array of numbers to get the average of.
 * @returns The average of the array.
 */
export function getAverage(arr: number[]) {
  return arr.reduce((p, c) => p + c, 0) / arr.length;
}

/**
 * Converts an unknown value to an error.
 *
 * @param thrown - The value to convert to an error.
 * @returns The error.
 */
export const asError = (thrown: unknown): Error => {
  if (thrown instanceof Error) return thrown;
  try {
    return new Error(JSON.stringify(thrown));
  } catch {
    // fallback in case there's an error stringifying.
    // for example, due to circular references.
    return new Error(String(thrown));
  }
};

/**
 * Gets the key with the highest value in a map.
 *
 * @param map - The map to get the key with the highest value from.
 * @returns The key with the highest value.
 */
export function getKeyWithHighestValue(map: Map<string, number>) {
  let maxKey: string | null = null;
  let maxValue = -Infinity;

  map.forEach((value, key) => {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  });

  return maxKey;
}
