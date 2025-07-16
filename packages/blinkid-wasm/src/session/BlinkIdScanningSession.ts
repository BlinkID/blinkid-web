/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { EmbindObject } from "../emscripten";
import { BlinkIdProcessResult } from "./BlinkIdProcessResult";
import { BlinkIdScanningResult } from "./BlinkIdScanningResult";
import { BlinkIdSessionError } from "./BlinkIdSessionError";

/** Represents the scanning session for BlinkID */
export type BlinkIdScanningSession = EmbindObject<{
  /**
   * Resets the scanning session to initial state
   *
   * @returns Void if successful, SessionError if failed
   */
  reset: () => void | BlinkIdSessionError;

  /**
   * Processes the input camera frame
   *
   * @param image The frame to process
   * @returns The `BlinkIdProcessResult` if successful, `BlinkIdSessionError` if
   *   failed
   */
  process: (image: ImageData) => BlinkIdProcessResult | BlinkIdSessionError;

  /**
   * Returns the result of the scanning session.
   *
   * @returns The `BlinkIdScanningResult`
   */
  getResult: () => BlinkIdScanningResult;
}>;
