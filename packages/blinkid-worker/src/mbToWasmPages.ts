/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * This function converts megabytes to WebAssembly pages.
 *
 * @param mb - The number of megabytes.
 * @returns The number of WebAssembly pages.
 */
export function mbToWasmPages(mb: number) {
  return Math.ceil((mb * 1024 * 1024) / 64 / 1024);
}
