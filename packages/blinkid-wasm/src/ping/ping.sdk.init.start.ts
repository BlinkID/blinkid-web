/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the data for the `ping.sdk.init.start` event. */
export type SdkInitStartData = {
  product: "BlinkID";
  platform: "Emscripten";
  packageName: string;
  userId: string; // uuid
};

/** Represents the `ping.sdk.init.start` event. */
export type PingSdkInitStart = PingBase<
  SdkInitStartData,
  "ping.sdk.init.start",
  "1.0.0"
>;
