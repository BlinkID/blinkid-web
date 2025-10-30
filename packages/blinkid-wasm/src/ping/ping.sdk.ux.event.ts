/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the data for the `ping.sdk.ux.event` event. */
export type SdkUxEventData = {
  eventType:
    | "CameraStarted"
    | "CameraClosed"
    | "OnboardingInfoDisplayed"
    | "CloseButtonClicked"
    | "HelpTooltipDisplayed"
    | "HelpOpened"
    | "HelpClosed"
    | "AlertDisplayed"
    | "ErrorMessage"
    | "StepTimeout"
    | "AppMovedToBackground";
  errorMessageType?:
    | "MoveCloser"
    | "MoveFarther"
    | "KeepVisible"
    | "FlipSide"
    | "AlignDocument"
    | "MoveFromEdge"
    | "IncreaseLighting"
    | "DecreaseLighting"
    | "EliminateBlur"
    | "EliminateGlare";
  alertType?:
    | "InvalidLicenseKey"
    | "NetworkError"
    | "DocumentClassNotAllowed"
    | "StepTimeout";
  helpCloseType?: "ContentSkipped" | "ContentFullyViewed";
};

/** Represents the `ping.sdk.ux.event` event. */
export type PingSdkUxEvent = PingBase<
  SdkUxEventData,
  "ping.sdk.ux.event",
  "1.0.0"
>;
