/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import type {
  BlinkIdWorkerInitSettings,
  BlinkIdWorkerProxy,
  ProgressStatusCallback,
} from "@microblink/blinkid-worker";
import type { SetOptional, Simplify } from "type-fest";
import { createProxyWorker } from "./createProxyWorker";
import { getUserId } from "./getUserId";
import { proxy, Remote } from "comlink";
import { defaultSessionSettings } from "./defaultSessionSettings";

/**
 * Configuration options for initializing the BlinkID core.
 *
 * This type extends the BlinkIdWorkerInitSettings type by making the userId and useLightweightBuild properties optional.
 * It allows for partial configuration of the initialization settings.
 */
export type BlinkIdInitSettings = SetOptional<
  BlinkIdWorkerInitSettings,
  // User ID is optional outside the worker scope
  "userId" | "useLightweightBuild"
>;

/**
 * Represents the BlinkID core instance.
 *
 * This type extends the Remote type from Comlink, which is used to proxy calls to the BlinkID worker.
 * It simplifies the type to remove unnecessary complexity.
 */
export type BlinkIdCore = Simplify<Remote<BlinkIdWorkerProxy>>;

/**
 * Creates and initializes a BlinkID core instance.
 *
 * @param settings - Configuration for BlinkID initialization including license key and resources location
 * @param progressCallback - Optional callback for tracking resource download progress (WASM, data files)
 * @returns Promise that resolves with initialized BlinkID core instance
 * @throws Error if initialization fails
 */
export async function loadBlinkIdCore(
  settings: BlinkIdInitSettings,
  progressCallback?: ProgressStatusCallback,
): Promise<BlinkIdCore> {
  const remoteWorker = await createProxyWorker(settings.resourcesLocation);

  if (!settings.userId) {
    settings.userId = getUserId();
  }

  if (!settings.resourcesLocation) {
    settings.resourcesLocation = window.location.href;
  }

  if (settings.useLightweightBuild === undefined) {
    // use only on desktop devices
    settings.useLightweightBuild =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
  }

  const proxyProgressCallback = progressCallback
    ? proxy(progressCallback)
    : undefined;

  try {
    // we added the `userid` to the settings if not provided, so this assertion is safe
    await remoteWorker.initBlinkId(
      settings as BlinkIdWorkerInitSettings,
      defaultSessionSettings,
      proxyProgressCallback,
    );

    return remoteWorker;
  } catch (error) {
    throw new Error("Failed to initialize BlinkID", {
      cause: error,
    });
  }
}
