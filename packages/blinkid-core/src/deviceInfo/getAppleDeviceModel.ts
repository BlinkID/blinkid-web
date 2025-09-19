/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

export type AppleDeviceModel = "iPhone" | "iPad" | "Mac";

/**
 * Detects the Apple device model using the user agent and touch capabilities.
 *
 * NOTE: This method is not fully reliable. Use feature detection when possible.
 *
 * @returns The detected device model or `undefined` if it's not an Apple device.
 */
export function getAppleDeviceModel(): AppleDeviceModel | undefined {
  const ua = navigator.userAgent;

  // Check for iPad first. Modern iPads report as 'Macintosh' but have
  // multi-touch capabilities. A Mac returns `maxTouchPoints` of 0.
  // We check for > 1 to be specific to multi-touch devices like iPad.
  if (
    /iPad/.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  ) {
    return "iPad";
  }

  if (/iPhone/.test(ua)) {
    return "iPhone";
  }

  // Check for Mac last, after the more specific iPad check.
  if (/Macintosh/.test(ua)) {
    return "Mac";
  }

  return undefined;
}
