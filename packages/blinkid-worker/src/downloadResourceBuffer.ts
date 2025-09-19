/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { getWasmFileSize } from "./getWasmFileSize";
import type {
  ResourceFileType,
  WasmBuildType,
  WasmVariant,
} from "@microblink/blinkid-wasm";

/**
 * The download progress.
 */
export type DownloadProgress = {
  loaded: number;
  contentLength: number;
  progress: number;
  finished: boolean;
};

export async function downloadResourceBuffer(
  url: string,
  resourceFileType: ResourceFileType,
  wasmVariant: WasmVariant,
  WasmBuildType: WasmBuildType,
  progressCallback?: (progress: DownloadProgress) => void,
): Promise<ArrayBuffer> {
  const response = await fetch(url);

  // If no progress callback is needed, return the buffer directly
  if (!progressCallback) {
    return response.arrayBuffer();
  }

  const contentLengthHeader = response.headers.get("Content-Length");

  // First try to get content length from response headers if available
  // If not, use the expected file size from wasmSizes
  const contentLength = contentLengthHeader
    ? parseInt(contentLengthHeader, 10)
    : getWasmFileSize(resourceFileType, wasmVariant, WasmBuildType);

  // Content length should never be NaN or zero
  // If it is, throw an error to avoid infinite loading or incorrect progress
  if (isNaN(contentLength) || contentLength <= 0) {
    throw new Error(
      `Invalid content length for ${resourceFileType} file: ${contentLength}`,
    );
  }

  let loaded = 0;

  // Create a transform stream to track progress
  const transformStream = new TransformStream({
    transform(chunk: Uint8Array, controller) {
      loaded += chunk.length;

      // Calculate progress percentage
      // Ensure progress does not exceed 100%
      const progress = Math.min(
        Math.round((loaded / contentLength) * 100),
        100,
      );

      progressCallback({
        loaded,
        contentLength,
        progress,
        finished: false,
      });

      controller.enqueue(chunk);
    },
    flush() {
      // When the stream is done, we know the total size
      progressCallback({
        loaded,
        contentLength,
        progress: 100,
        finished: true,
      });
    },
  });

  // Create a new response with the transform stream
  const transformedResponse = new Response(
    response.body?.pipeThrough(transformStream),
    response,
  );

  return transformedResponse.arrayBuffer();
}
