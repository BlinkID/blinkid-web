/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { nanoid } from "nanoid";

const key = "blinkid-userid";

/**
 * Gets the user id from local storage, or generates a new one.
 *
 * This is a workaround for the lack of a user id in the worker scope.
 *
 * @returns a unique user id
 */
export function getUserId() {
  // Users can block localStorage or other storage mechanisms
  const hasLocalStorage = testLocalStorage();

  if (!hasLocalStorage) {
    return nanoid();
  }

  const previousId = localStorage.getItem(key);
  if (previousId) {
    return previousId;
  }

  const randomId = nanoid();
  localStorage.setItem(key, randomId);
  return randomId;
}

/**
 * Tests if local storage is available in the browser
 */
export function testLocalStorage() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch {
    return false;
  }
}
