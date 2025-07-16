/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/** Represents the error statuses returned from the `BlinkIDScanningSession`. */
export type BlinkIdSessionErrorType = "document-scanned" | "result-retrieved";

/**
 * Represents the error returned from `BlinkIdScanningSession.process` and
 * `BlinkIdScanningSession.reset`.
 */
export type BlinkIdSessionError = {
  /** The error type. */
  error: BlinkIdSessionErrorType;
};
