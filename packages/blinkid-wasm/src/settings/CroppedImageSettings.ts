/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/** Represents the image cropping options. */
export type CroppedImageSettings = {
  /** The DPI value for the cropped image. */
  dotsPerInch: number;

  /**
   * The extension factor for the cropped image. Applicable only to
   * document images. Allowed value is from `0.0` to `1.0`
   */
  extensionFactor: number;

  /** Indicates whether the document image should be returned. */
  returnDocumentImage: boolean;

  /** Indicates whether the face image should be returned. */
  returnFaceImage: boolean;

  /** Indicates whether the signature image should be returned. */
  returnSignatureImage: boolean;
};
