/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { BlinkIdSessionSettings } from "@microblink/blinkid-wasm";

/**
 * Default session settings for BlinkID core.
 *
 * This is the default session settings for BlinkID core.
 * It is used to initialize the BlinkID core instance, unless overridden by the user.
 *
 * @see BlinkIdSessionSettings for more details.
 */
export const defaultSessionSettings: BlinkIdSessionSettings = {
  inputImageSource: "video",
  scanningMode: "automatic",
  scanningSettings: {
    allowUncertainFrontSideScan: false,
    blurDetectionLevel: "mid",
    glareDetectionLevel: "mid",
    tiltDetectionLevel: "mid",
    skipImagesWithBlur: true,
    skipImagesWithGlare: true,
    skipImagesOccludedByHand: true,
    skipImagesWithInadequateLightingConditions: true,
    combineResultsFromMultipleInputImages: true,
    croppedImageSettings: {
      dotsPerInch: 250,
      extensionFactor: 0,
      returnDocumentImage: false,
      returnFaceImage: false,
      returnSignatureImage: false,
    },
    customDocumentAnonymizationSettings: [],
    customDocumentRules: [],
    enableBarcodeScanOnly: false,
    enableCharacterValidation: true,
    inputImageMargin: 0.02,
    maxAllowedMismatchesPerField: 0,
    recognitionModeFilter: {
      enableBarcodeId: true,
      enableFullDocumentRecognition: true,
      enableMrzId: true,
      enableMrzPassport: true,
      enableMrzVisa: true,
      enablePhotoId: true,
    },
    returnInputImages: false,
    scanCroppedDocumentImage: false,
    scanPassportDataPageOnly: true,
    scanUnsupportedBack: false,
    anonymizationMode: "full-result",
  },
};
