/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the data for the `ping.error` event. */
export type ErrorData = {
  errorType: "NonFatal" | "Crash";
  errorMessage: string;
  stackTrace?: string;
};

/** Represents the `ping.error` event. */
export type PingError = PingBase<ErrorData, "ping.error", "1.0.0">;
