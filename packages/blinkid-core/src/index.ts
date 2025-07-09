/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { WorkerScanningSession } from "@microblink/blinkid-worker";
import { Remote } from "comlink";

export * from "./BlinkIdCore";
export * from "./createCustomImageData";
export * from "./createProxyWorker";
export * from "./defaultSessionSettings";
export * from "./getCrossOriginWorkerURL";
export * from "./getUserId";
export * from "./utils";

export type * from "@microblink/blinkid-wasm";
export type * from "@microblink/blinkid-worker";

export type RemoteScanningSession = Remote<WorkerScanningSession>;

// https://newsletter.daishikato.com/p/detecting-dual-module-issues-in-jotai

const testSymbol = Symbol();

declare global {
  /* eslint-disable no-var */
  var __BLINKID_CORE__: typeof testSymbol;
}

globalThis.__BLINKID_CORE__ ||= testSymbol;
if (globalThis.__BLINKID_CORE__ !== testSymbol) {
  console.warn(
    "Detected multiple instances of @microblink/blinkid-core. This can lead to unexpected behavior.",
  );
}
