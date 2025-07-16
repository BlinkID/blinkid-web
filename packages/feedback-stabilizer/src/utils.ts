/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Utility type that creates a union type where at least one property from `T` must be defined.
 * All other properties remain optional.
 *
 * @template T - The object type to make at least one property required from.
 */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

/**
 * Gets the key associated with the highest numeric value in an object.
 * Throws an error if the object is empty.
 *
 * @template TObj - Type of the object, must be a record with string keys and number values.
 * @param obj - The object to search through.
 * @returns The key associated with the highest value.
 * @throws {Error} When the input object is empty.
 */
export function getKeyWithHighestValue<TObj extends Record<string, number>>(
  obj: TObj,
): keyof TObj {
  const keys = Object.keys(obj);

  if (keys.length === 0) {
    throw new Error("No members in object!");
  }
  // set default
  let maxKey = keys[0];
  let maxValue = -Infinity;

  for (const [key, value] of Object.entries(obj)) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  }

  return maxKey;
}

/**
 * Calculates the arithmetic mean (average) of an array of numbers.
 *
 * @param arr - Array of numbers to calculate the average from.
 * @returns The arithmetic mean of the input array.
 */
export function getAverage(arr: number[]) {
  return arr.reduce((p, c) => p + c, 0) / arr.length;
}

/**
 * Converts any thrown value into an Error object.
 * Ensures consistent error handling by wrapping non-Error throws.
 *
 * @param thrown - The value that was thrown, could be of any type.
 * @returns An Error object, either the original if it was an Error, or a new one containing the stringified thrown value.
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
