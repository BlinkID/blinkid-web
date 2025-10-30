/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { BlinkIdUiStateKey } from "../core/blinkid-ui-state";
import { LocalizationStrings } from "./LocalizationContext";

/**
 * The feedback messages.
 */
export const feedbackMessages: Partial<
  Record<BlinkIdUiStateKey, keyof LocalizationStrings>
> = {
  SENSING_FRONT: "scan_the_front_side",
  SENSING_BACK: "scan_the_back_side",
  FLIP_CARD: "flip_to_back_side",
  WRONG_SIDE: "flip_document",
  SCAN_BARCODE: "scan_the_barcode",
  // passport
  SENSING_DATA_PAGE: "scan_data_page",
  SENSING_TOP_PAGE: "scan_top_page",
  SENSING_LEFT_PAGE: "scan_left_page",
  SENSING_RIGHT_PAGE: "scan_right_page",
  SENSING_LAST_PAGE: "scan_last_page_barcode",
  MOVE_TOP: "move_top",
  MOVE_LEFT: "move_left",
  MOVE_RIGHT: "move_right",
  MOVE_LAST_PAGE: "scan_last_page_barcode",
  WRONG_TOP_PAGE: "wrong_top",
  WRONG_LEFT_PAGE: "wrong_left",
  WRONG_RIGHT_PAGE: "wrong_right",
  WRONG_LAST_PAGE: "scan_last_page_barcode",
  // occlusion
  BLUR_DETECTED: "blur_detected",
  GLARE_DETECTED: "glare_detected",
  OCCLUDED: "occluded",
  // image
  FACE_PHOTO_OCCLUDED: "face_photo_not_fully_visible",
  // framing
  DOCUMENT_FRAMING_CAMERA_TOO_CLOSE: "move_farther",
  DOCUMENT_FRAMING_CAMERA_TOO_FAR: "move_closer",
  DOCUMENT_TOO_CLOSE_TO_FRAME_EDGE: "document_too_close_to_edge",
  DOCUMENT_FRAMING_CAMERA_ANGLE_TOO_STEEP: "camera_angle_too_steep",
  // lighting
  TOO_DARK: "too_dark",
  TOO_BRIGHT: "too_bright",
};
