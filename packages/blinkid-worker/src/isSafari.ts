/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Checks if the current environment is iOS.
 *
 * @returns True if running on iOS device, false otherwise.
 */
export function isIOS(): boolean {
  const userAgent = self.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

/**
 * Checks if the current environment is Safari browser.
 *
 * @returns True if running on Safari, false otherwise.
 */
export function isSafari(): boolean {
  const userAgent = self.navigator.userAgent.toLowerCase();
  const isSafariBrowser =
    userAgent.includes("safari") && !userAgent.includes("chrome");
  return isSafariBrowser || isIOS();
}
