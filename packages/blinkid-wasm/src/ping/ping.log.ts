/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the data for the `ping.log` event. */
export type LogData = {
  logLevel: "Info" | "Warning";
  logMessage: string;
};

/** Represents the `ping.log` event. */
export type PingLog = PingBase<LogData, "ping.log", "1.0.0">;
