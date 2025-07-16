/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { BlinkIdScanningSession, BlinkIdSessionSettings } from "./session";
import { LicenseUnlockResult, ServerPermissionSubmitResult } from "./licencing";
import type { EmscriptenModule } from "./emscripten";

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
  ) => BlinkIdScanningSession;
  initializeWithLicenseKey: (
    licenceKey: string,
    userId: string,
    allowHelloMessage: boolean,
  ) => LicenseUnlockResult;
  submitServerPermission: (
    serverPermission: unknown,
  ) => ServerPermissionSubmitResult;
  getActiveLicenseTokenInfo: () => LicenseUnlockResult;
  setPingProxyUrl: (url: string) => void;
}
