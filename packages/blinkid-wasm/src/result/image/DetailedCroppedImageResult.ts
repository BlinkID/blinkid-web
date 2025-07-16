/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Rectangle } from "../../utils";
import { ScanningSide } from "../ScanningSide";

/**
 * Represents the result of the image crop transformation with additional
 * details.
 */
export type DetailedCroppedImageResult = {
  /** The image data. */
  image: ImageData;
  /** The location of the image. */
  location?: Rectangle;
  /** The side of the image. */
  side?: ScanningSide;
};
