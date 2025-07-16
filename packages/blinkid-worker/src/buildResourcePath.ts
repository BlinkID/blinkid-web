/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Builds, normalizes, and validates a resource URL by joining path segments.
 *
 * @param segments - Array of path segments to join.
 * @returns Normalized URL path.
 * @throws Error if the resulting URL is invalid.
 */
export function buildResourcePath(...segments: string[]): string {
  // Filter out null, undefined, or empty segments using Boolean.
  const path = segments
    .filter((segment) => segment) // Using Boolean filtering is safe since non-empty strings are truthy.
    .join("/")
    .replace(/([^:]\/)\/+/g, "$1");

  // Validate the URL using a dummy base (works for both absolute and relative URLs).
  try {
    new URL(path, "http://example.com");
  } catch {
    throw new Error(`Invalid URL: ${path}`);
  }

  return path;
}
