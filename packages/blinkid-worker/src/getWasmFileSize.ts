/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import type {
  ResourceFileType,
  WasmBuildType,
  WasmVariant,
} from "@microblink/blinkid-wasm";
import sizeManifest from "@microblink/blinkid-wasm/size-manifest.json";

/**
 * Gets the expected file size for a WASM or data file.
 * @param fileType - The type of file (wasm or data)
 * @param variant - The WASM variant
 * @param buildType - The build type (full or lightweight)
 * @returns The expected file size in bytes, or undefined if not known
 */
export function getWasmFileSize(
  fileType: ResourceFileType,
  variant: WasmVariant,
  buildType: WasmBuildType,
): number {
  return sizeManifest[fileType][variant][buildType];
}
