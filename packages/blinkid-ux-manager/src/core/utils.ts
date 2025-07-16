/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Calculates the average of an array of numbers.
 *
 * @param arr - The array of numbers.
 * @returns The average of the array.
 */
export function getAverage(arr: number[]) {
  return arr.reduce((p, c) => p + c, 0) / arr.length;
}

/**
 * Converts an unknown value to an Error object.
 *
 * @param thrown - The value to convert.
 * @returns The Error object.
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
 * Sleeps for a given number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the given number of milliseconds.
 */
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
