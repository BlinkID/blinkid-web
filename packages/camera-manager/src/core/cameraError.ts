/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * A camera error code.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type CameraErrorCode = "PERMISSION_DENIED" | (string & {});

/**
 * A camera error.
 */
export class CameraError extends Error {
  code: CameraErrorCode;

  /**
   * Creates a new camera error.
   *
   * @param message - The error message.
   * @param code - The error code.
   * @param cause - The cause of the error.
   */
  constructor(message: string, code: CameraErrorCode, cause?: Error) {
    super(message);
    this.code = code;
    this.cause = cause;
  }
}
