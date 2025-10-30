/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the data for the `ping.sdk.wrapper.product` event. */
export type SdkWrapperProductData = {
  wrapperProduct:
    | "CrossplatformFlutter"
    | "CrossplatformReactNative"
    | "IdentityVerification";
  correlationId?: string;
};

/** Represents the `ping.sdk.wrapper.product` event. */
export type PingSdkWrapperProduct = PingBase<
  SdkWrapperProductData,
  "ping.sdk.wrapper.product",
  "1.0.0"
>;
