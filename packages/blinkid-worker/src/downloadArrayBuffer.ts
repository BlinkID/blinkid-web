/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Downloads the resource at the given URL and returns its ArrayBuffer.
 * @param url - The URL of the resource to download.
 * @param progressCallback - An optional callback that is called with download progress.
 * @returns The downloaded ArrayBuffer.
 */
export async function downloadArrayBuffer(
  url: string,
  progressCallback?: (progress: DownloadProgress) => void,
): Promise<ArrayBuffer> {
  const response = await fetch(url);

  // Fallback: if response body or content length not available, return the full ArrayBuffer directly.
  if (!response.body || !response.headers.has("Content-Length")) {
    return response.arrayBuffer();
  }

  const contentLength = parseInt(response.headers.get("Content-Length")!, 10);
  let loaded = 0;
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];

  let result = await reader.read();
  while (!result.done) {
    const value = result.value;
    if (value) {
      chunks.push(value);
      loaded += value.length;
      if (progressCallback) {
        const progress = Math.min(
          Math.round((loaded / contentLength) * 100),
          100,
        );
        progressCallback({
          loaded,
          contentLength,
          progress,
        });
      }
    }
    result = await reader.read();
  }

  const allChunks = new Uint8Array(loaded);
  let position = 0;
  for (const chunk of chunks) {
    allChunks.set(chunk, position);
    position += chunk.length;
  }

  return allChunks.buffer;
}

/**
 * The download progress.
 */
export type DownloadProgress = {
  loaded: number;
  contentLength: number;
  progress: number;
};
