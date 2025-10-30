/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import type { EmscriptenModule } from "./emscripten";
import { LicenseUnlockResult, ServerPermissionSubmitError } from "./licencing";
import { BlinkIdScanningSession, BlinkIdSessionSettings } from "./session";

/**
 * The BlinkID Wasm module.
 *
 * @ignore
 */
export interface BlinkIdWasmModule extends BlinkIdBindings, EmscriptenModule {}

/**
 * The BlinkID bindings.
 *
 * @ignore
 */
export interface BlinkIdBindings {
  createBlinkIdScanningSession: (
    sessionSettings: BlinkIdSessionSettings,
    userId: string,
  ) => BlinkIdScanningSession;
  initializeWithLicenseKey: (
    licenceKey: string,
    userId: string,
    allowHelloMessage: boolean,
  ) => LicenseUnlockResult;
  submitServerPermission: (
    serverPermission: string,
  ) => ServerPermissionSubmitError | undefined;
  getActiveLicenseTokenInfo: () => LicenseUnlockResult;
  setPingProxyUrl: (url: string) => void;
  initializeSdk: (userId: string) => void;
  terminateSdk: () => void;
  sendPinglets: () => void;
  arePingRequestsInProgress: () => boolean;
  queuePinglet: (
    data: string,
    schemaName: string,
    schemaVersion: string,
    sessionNumber: number,
  ) => void;
  isPingEnabled: () => boolean;
}
