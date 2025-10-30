/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the `ping.browser.device.info` event. */
export type PingBrowserDeviceInfo = PingBase<
  // Unknown because the types are augmented on the `blinkid-core` level.
  unknown,
  "ping.browser.device.info",
  "1.0.0"
>;
