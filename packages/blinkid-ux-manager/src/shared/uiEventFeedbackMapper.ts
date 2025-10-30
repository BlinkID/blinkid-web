/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import type { SdkUxEventData } from "@microblink/blinkid-core";
import type { BlinkIdUiStateKey } from "../core/blinkid-ui-state";
import { PingSdkUxEventImpl } from "./ping-implementations";

type ErrorStates = Extract<
  BlinkIdUiStateKey,
  | "DOCUMENT_FRAMING_CAMERA_TOO_FAR"
  | "DOCUMENT_FRAMING_CAMERA_TOO_CLOSE"
  | "DOCUMENT_FRAMING_CAMERA_ANGLE_TOO_STEEP"
  | "DOCUMENT_TOO_CLOSE_TO_FRAME_EDGE"
  | "BLUR_DETECTED"
  | "GLARE_DETECTED"
  | "TOO_DARK"
  | "TOO_BRIGHT"
  | "OCCLUDED"
  | "FACE_PHOTO_OCCLUDED"
  | "WRONG_SIDE"
  | "WRONG_LEFT_PAGE"
  | "WRONG_RIGHT_PAGE"
  | "WRONG_TOP_PAGE"
>;

const uiStateToErrorMessageMap: Record<
  ErrorStates,
  NonNullable<SdkUxEventData["errorMessageType"]>
> = {
  DOCUMENT_FRAMING_CAMERA_TOO_FAR: "MoveCloser",
  DOCUMENT_FRAMING_CAMERA_TOO_CLOSE: "MoveFarther",
  DOCUMENT_FRAMING_CAMERA_ANGLE_TOO_STEEP: "AlignDocument",
  DOCUMENT_TOO_CLOSE_TO_FRAME_EDGE: "MoveFromEdge",
  BLUR_DETECTED: "EliminateBlur",
  GLARE_DETECTED: "EliminateGlare",
  TOO_DARK: "IncreaseLighting",
  TOO_BRIGHT: "DecreaseLighting",
  OCCLUDED: "KeepVisible",
  FACE_PHOTO_OCCLUDED: "KeepVisible",
  WRONG_SIDE: "FlipSide",
  WRONG_LEFT_PAGE: "FlipSide",
  WRONG_RIGHT_PAGE: "FlipSide",
  WRONG_TOP_PAGE: "FlipSide",
};

function isErrorState(key: BlinkIdUiStateKey): key is ErrorStates {
  return key in uiStateToErrorMessageMap;
}

export function createErrorMessagePingFromUiState(
  uiStateKey: BlinkIdUiStateKey,
): PingSdkUxEventImpl | null {
  if (isErrorState(uiStateKey)) {
    const errorMessageType = uiStateToErrorMessageMap[uiStateKey];
    return new PingSdkUxEventImpl({
      eventType: "ErrorMessage",
      errorMessageType,
    });
  }
  return null;
}
