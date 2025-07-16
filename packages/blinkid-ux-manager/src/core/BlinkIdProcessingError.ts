/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * BlinkID processing error. These errors are usually unrecoverable and require
 * the user to retry the scanning process.
 */
export type BlinkIdProcessingError =
  // processing
  | "timeout"

  // other
  | "unknown";

/**
 * BlinkID Init errors are not something that should be handled by the end user
 * therefore we don't need to display them in the UI. Camera permission errors
 * are handled in the Camera Manager component.
 */
