/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the data for the `ping.sdk.scan.conditions` event. */
export type SdkScanConditionsData = {
  updateType: "DeviceOrientation" | "FlashlightState";
  deviceOrientation?:
    | "Portrait"
    | "LandscapeRight"
    | "LandscapeLeft"
    | "PortraitUpside";
  flashlightOn?: boolean;
};

/** Represents the `ping.sdk.scan.conditions` event. */
export type PingSdkScanConditions = PingBase<
  SdkScanConditionsData,
  "ping.sdk.scan.conditions",
  "1.0.0"
>;
