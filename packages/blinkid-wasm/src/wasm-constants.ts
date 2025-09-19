/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

export const resourceFileTypes = ["wasm", "data"] as const;
export const wasmBuildTypes = ["full", "lightweight"] as const;
export const wasmVariants = ["basic", "advanced", "advanced-threads"] as const;

export type ResourceFileType = (typeof resourceFileTypes)[number];
export type WasmBuildType = (typeof wasmBuildTypes)[number];
export type WasmVariant = (typeof wasmVariants)[number];
