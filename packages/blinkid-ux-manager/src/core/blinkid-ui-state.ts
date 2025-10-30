/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import {
  DocumentClassInfo,
  InputImageAnalysisResult,
  ResultCompleteness,
  ScanningSettings,
} from "@microblink/blinkid-core";
import { UiState } from "@microblink/feedback-stabilizer";
import { match, P } from "ts-pattern";

/**
 * The type of reticle to display.
 */
export type BlinkIdReticleType =
  | "searching"
  | "processing"
  | "error"
  | "done"
  | "flip"
  | "move_top"
  | "move_left"
  | "move_right";

/**
 * The key of the UI state.
 */
export type BlinkIdUiStateKey =
  | "FLIP_CARD"
  | "DOCUMENT_CAPTURED"
  | "SENSING_FRONT"
  | "SENSING_BACK"
  | "SENSING_DATA_PAGE"
  | "SENSING_TOP_PAGE"
  | "SENSING_LEFT_PAGE"
  | "SENSING_RIGHT_PAGE"
  | "SENSING_LAST_PAGE"
  | "MOVE_TOP"
  | "MOVE_LEFT"
  | "MOVE_RIGHT"
  | "MOVE_LAST_PAGE"
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
  | "UNSUPPORTED_DOCUMENT"
  | "SCAN_BARCODE"
  | "WRONG_TOP_PAGE"
  | "WRONG_LEFT_PAGE"
  | "WRONG_RIGHT_PAGE"
  | "WRONG_LAST_PAGE"
  | "WRONG_SIDE";

/**
 * Extended UI state for BlinkID.
 *
 * @template K - The key of the UI state.
 */
export type BlinkIdUiStateMap = {
  [K in BlinkIdUiStateKey]: UiState & {
    /** The key of the UI state. */
    key: K;
    /** The type of the reticle. */
    reticleType: BlinkIdReticleType;
  };
};

/**
 * The UI state of BlinkID.
 */
export type BlinkIdUiState = BlinkIdUiStateMap[keyof BlinkIdUiStateMap];

/**
 * The UI state map of BlinkID.
 */
export const blinkIdUiStateMap: BlinkIdUiStateMap = {
  SENSING_FRONT: {
    key: "SENSING_FRONT",
    reticleType: "searching",
    minDuration: 1000,
  },
  SENSING_BACK: {
    key: "SENSING_BACK",
    reticleType: "searching",
    minDuration: 1000,
  },
  SENSING_DATA_PAGE: {
    key: "SENSING_DATA_PAGE",
    reticleType: "searching",
    minDuration: 1000,
  },
  SENSING_TOP_PAGE: {
    key: "SENSING_TOP_PAGE",
    reticleType: "searching",
    minDuration: 1000,
  },
  SENSING_LEFT_PAGE: {
    key: "SENSING_LEFT_PAGE",
    reticleType: "searching",
    minDuration: 1000,
  },
  SENSING_RIGHT_PAGE: {
    key: "SENSING_RIGHT_PAGE",
    reticleType: "searching",
    minDuration: 1000,
  },
  SENSING_LAST_PAGE: {
    key: "SENSING_LAST_PAGE",
    reticleType: "searching",
    minDuration: 1000,
  },
  SCAN_BARCODE: {
    key: "SCAN_BARCODE",
    reticleType: "processing",
    minDuration: 1000,
  },
  // ID card captured, flip to back side
  FLIP_CARD: {
    key: "FLIP_CARD",
    reticleType: "flip",
    minDuration: 2000,
    singleEmit: true,
  },
  // Passport pages captured, move to the next page
  MOVE_TOP: {
    key: "MOVE_TOP",
    reticleType: "move_top",
    minDuration: 2000,
    singleEmit: true,
  },
  MOVE_LEFT: {
    key: "MOVE_LEFT",
    reticleType: "move_left",
    minDuration: 2000,
    singleEmit: true,
  },
  MOVE_RIGHT: {
    key: "MOVE_RIGHT",
    reticleType: "move_right",
    minDuration: 2000,
    singleEmit: true,
  },
  MOVE_LAST_PAGE: {
    key: "MOVE_LAST_PAGE",
    reticleType: "done",
    minDuration: 0,
    singleEmit: true,
  },
  // Capturing all sides completed
  DOCUMENT_CAPTURED: {
    key: "DOCUMENT_CAPTURED",
    reticleType: "done",
    minDuration: 1000,
    singleEmit: true,
  },
  BLUR_DETECTED: {
    key: "BLUR_DETECTED",
    reticleType: "error",
    minDuration: 1500,
  },
  GLARE_DETECTED: {
    key: "GLARE_DETECTED",
    reticleType: "error",
    minDuration: 1500,
  },
  OCCLUDED: {
    key: "OCCLUDED",
    reticleType: "error",
    minDuration: 1500,
  },
  FACE_PHOTO_OCCLUDED: {
    key: "FACE_PHOTO_OCCLUDED",
    reticleType: "error",
    minDuration: 1500,
  },
  WRONG_SIDE: {
    key: "WRONG_SIDE",
    reticleType: "error",
    minDuration: 1500,
  },
  WRONG_TOP_PAGE: {
    key: "WRONG_TOP_PAGE",
    reticleType: "error",
    minDuration: 1500,
  },
  WRONG_LEFT_PAGE: {
    key: "WRONG_LEFT_PAGE",
    reticleType: "error",
    minDuration: 1500,
  },
  WRONG_RIGHT_PAGE: {
    key: "WRONG_RIGHT_PAGE",
    reticleType: "error",
    minDuration: 1500,
  },
  WRONG_LAST_PAGE: {
    key: "WRONG_LAST_PAGE",
    reticleType: "error",
    minDuration: 1500,
  },
  TOO_DARK: {
    key: "TOO_DARK",
    reticleType: "error",
    minDuration: 1500,
  },
  TOO_BRIGHT: {
    key: "TOO_BRIGHT",
    reticleType: "error",
    minDuration: 1500,
  },
  DOCUMENT_FRAMING_CAMERA_TOO_FAR: {
    key: "DOCUMENT_FRAMING_CAMERA_TOO_FAR",
    reticleType: "error",
    minDuration: 1500,
  },
  DOCUMENT_FRAMING_CAMERA_TOO_CLOSE: {
    key: "DOCUMENT_FRAMING_CAMERA_TOO_CLOSE",
    reticleType: "error",
    minDuration: 1500,
  },
  DOCUMENT_FRAMING_CAMERA_ANGLE_TOO_STEEP: {
    key: "DOCUMENT_FRAMING_CAMERA_ANGLE_TOO_STEEP",
    reticleType: "error",
    minDuration: 1500,
  },
  DOCUMENT_TOO_CLOSE_TO_FRAME_EDGE: {
    key: "DOCUMENT_TOO_CLOSE_TO_FRAME_EDGE",
    reticleType: "error",
    minDuration: 1500,
  },
  UNSUPPORTED_DOCUMENT: {
    key: "UNSUPPORTED_DOCUMENT",
    reticleType: "error",
    minDuration: 1500,
  },
} as const;

/**
 * The states that are captured when the first side is captured.
 */
export const firstSideCapturedUiStateKeys: BlinkIdUiStateKey[] = [
  // two sided documents
  "FLIP_CARD",
  // passport pages
  "MOVE_LEFT",
  "MOVE_RIGHT",
  "MOVE_TOP",
  "MOVE_LAST_PAGE",
] as const;

/** The error UI state keys. */
export const errorUiStateKeys: BlinkIdUiStateKey[] = Object.values(
  blinkIdUiStateMap,
)
  .filter((state) => state.reticleType === "error")
  .map((state) => state.key);

/**
 * The partial process result.
 */
export type PartialProcessResult = {
  /** The input image analysis result. */
  inputImageAnalysisResult: Partial<InputImageAnalysisResult>;
  /** The result completeness. */
  resultCompleteness: Partial<ResultCompleteness>;
};

/**
 * Checks if the document is a passport.
 *
 * @param docClass - The document class info.
 * @returns True if the document is a passport, false otherwise.
 */
function isPassport(docClass: DocumentClassInfo | undefined) {
  return docClass?.type === "passport";
}

/**
 * Checks if the document is a passport and has a barcode on the last page (USA or India).
 *
 * @param docClass - The document class info.
 * @returns True if the document is a passport and has a barcode on the last page (USA or India), false otherwise.
 */
function isPassportWithBarcode(docClass: DocumentClassInfo | undefined) {
  return (
    isPassport(docClass) &&
    (docClass?.country === "usa" || docClass?.country === "india")
  );
}

/**
 * Determines the appropriate UI state key based on the current frame processing
 * result and scanning settings.
 *
 * This function acts as a state machine, translating the low-level analysis and
 * completeness results into a high-level UI state that drives the user
 * interface.
 *
 * @param frameProcessResult - The current (possibly partial) result of frame
 * processing, including image analysis and completeness.
 * @param settings - Optional scanning settings that may influence state
 * selection.
 * @returns The UI state key representing what should be shown to the user.
 */
export function getUiStateKey(
  frameProcessResult: PartialProcessResult,
  settings?: Partial<ScanningSettings>,
) {
  return (
    match<PartialProcessResult, BlinkIdUiStateKey>(frameProcessResult)
      // Success states
      .with(
        {
          resultCompleteness: {
            scanningStatus: "document-scanned",
          },
        },
        () => "DOCUMENT_CAPTURED",
      )

      // unsupported document
      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "unsupported-document",
          },
        },
        () => "UNSUPPORTED_DOCUMENT",
      )

      // passport pages captured
      .with(
        {
          resultCompleteness: {
            scanningStatus: "side-scanned",
          },
          inputImageAnalysisResult: {
            documentClassInfo: P.when(isPassportWithBarcode),
          },
        },
        () => "MOVE_LAST_PAGE",
      )
      .with(
        {
          resultCompleteness: {
            scanningStatus: "side-scanned",
          },
          inputImageAnalysisResult: {
            documentClassInfo: P.when(isPassport),
            documentRotation: "counter-clockwise-90",
          },
        },
        () => "MOVE_LEFT",
      )
      .with(
        {
          resultCompleteness: {
            scanningStatus: "side-scanned",
          },
          inputImageAnalysisResult: {
            documentClassInfo: P.when(isPassport),
            documentRotation: "clockwise-90",
          },
        },
        () => "MOVE_RIGHT",
      )
      .with(
        {
          resultCompleteness: {
            scanningStatus: "side-scanned",
          },
          inputImageAnalysisResult: {
            documentClassInfo: P.when(isPassport),
          },
        },
        () => "MOVE_TOP",
      )

      // side captured on non-passport
      .with(
        {
          resultCompleteness: {
            scanningStatus: "side-scanned",
          },
        },
        () => "FLIP_CARD",
      )

      // framing
      .with(
        {
          inputImageAnalysisResult: {
            documentDetectionStatus: "camera-angle-too-steep",
          },
        },
        () => "DOCUMENT_FRAMING_CAMERA_ANGLE_TOO_STEEP",
      )
      .with(
        {
          inputImageAnalysisResult: {
            documentDetectionStatus: "camera-too-close",
          },
        },
        () => "DOCUMENT_FRAMING_CAMERA_TOO_CLOSE",
      )
      .with(
        {
          inputImageAnalysisResult: {
            documentDetectionStatus: "camera-too-far",
          },
        },
        () => "DOCUMENT_FRAMING_CAMERA_TOO_FAR",
      )
      .with(
        {
          inputImageAnalysisResult: {
            documentDetectionStatus: "document-too-close-to-camera-edge",
          },
        },
        () => "DOCUMENT_TOO_CLOSE_TO_FRAME_EDGE",
      )

      // lighting
      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "image-preprocessing-failed",
            documentLightingStatus: P.when(
              (status) =>
                status === "too-bright" &&
                settings?.skipImagesWithInadequateLightingConditions,
            ),
          },
        },
        () => "TOO_BRIGHT",
      )
      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "image-preprocessing-failed",
            documentLightingStatus: P.when(
              (status) =>
                status === "too-dark" &&
                settings?.skipImagesWithInadequateLightingConditions,
            ),
          },
        },
        () => "TOO_DARK",
      )

      // glare
      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "image-preprocessing-failed",
            glareDetectionStatus: P.when(
              (status) =>
                status === "detected" && settings?.skipImagesWithGlare,
            ),
          },
        },
        () => "GLARE_DETECTED",
      )

      // occluded
      .with(
        {
          inputImageAnalysisResult: {
            documentDetectionStatus: "document-partially-visible",
          },
        },
        () => "OCCLUDED",
      )
      .with(
        {
          inputImageAnalysisResult: {
            documentHandOcclusionStatus: P.when(
              (status) =>
                status === "detected" && settings?.skipImagesOccludedByHand,
            ),
          },
        },
        () => "OCCLUDED",
      )
      .with(
        {
          inputImageAnalysisResult: {
            missingMandatoryFields: P.when(
              (arr) => Array.isArray(arr) && arr.length > 0,
            ),
          },
        },
        () => "OCCLUDED",
      )
      // technically the same as the previous case
      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "mandatory-field-missing",
          },
        },
        () => "OCCLUDED",
      )
      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "invalid-characters-found",
          },
        },
        () => "OCCLUDED",
      )
      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "mrz-parsing-failed",
          },
        },
        () => "OCCLUDED",
      )

      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "image-return-failed",
            imageExtractionFailures: P.when(
              (arr) => Array.isArray(arr) && arr.includes("face"),
            ),
          },
        },
        () => "FACE_PHOTO_OCCLUDED",
      )

      // blur
      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "image-preprocessing-failed",
            blurDetectionStatus: P.when(
              (status) => status === "detected" && settings?.skipImagesWithBlur,
            ),
          },
        },
        () => "BLUR_DETECTED",
      )

      // scan wrong side / page
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "second",
            processingStatus: "scanning-wrong-side",
            documentClassInfo: P.when(isPassportWithBarcode),
          },
        },
        () => "WRONG_LAST_PAGE",
      )
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "second",
            processingStatus: "scanning-wrong-side",
            documentClassInfo: P.when(isPassport),
            documentRotation: "counter-clockwise-90",
          },
        },
        () => "WRONG_LEFT_PAGE",
      )
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "second",
            processingStatus: "scanning-wrong-side",
            documentClassInfo: P.when(isPassport),
            documentRotation: "clockwise-90",
          },
        },
        () => "WRONG_RIGHT_PAGE",
      )
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "second",
            processingStatus: "scanning-wrong-side",
            documentClassInfo: P.when(isPassport),
          },
        },
        () => "WRONG_TOP_PAGE",
      )
      .with(
        {
          inputImageAnalysisResult: {
            processingStatus: "scanning-wrong-side",
          },
        },
        () => "WRONG_SIDE",
      )

      // scan barcode
      .with(
        {
          resultCompleteness: {
            scanningStatus: "scanning-barcode-in-progress",
          },
        },
        () => "SCAN_BARCODE",
      )

      // scan passport second page (in frame)
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "second",
            documentClassInfo: P.when(isPassportWithBarcode),
          },
        },
        () => "SENSING_LAST_PAGE",
      )
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "second",
            documentClassInfo: P.when(isPassport),
            documentRotation: "counter-clockwise-90",
          },
        },
        () => "SENSING_LEFT_PAGE",
      )
      // TODO: upside-down?
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "second",
            documentClassInfo: P.when(isPassport),
            documentRotation: "clockwise-90",
          },
        },
        () => "SENSING_RIGHT_PAGE",
      )

      // sensing passport data page
      // TODO: this cannot occur
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "first",
            documentClassInfo: P.when(isPassport),
          },
        },
        () => "SENSING_DATA_PAGE",
      )

      // passport side fallback
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "second",
            documentClassInfo: P.when(isPassport),
          },
        },
        () => "SENSING_TOP_PAGE",
      )

      // scan front
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "first",
          },
        },
        () => "SENSING_FRONT",
      )

      // scan back
      .with(
        {
          inputImageAnalysisResult: {
            scanningSide: "second",
          },
          // TODO: do we need this?
          resultCompleteness: {
            scanningStatus: "scanning-side-in-progress",
          },
        },
        () => "SENSING_BACK",
      )

      // fallback
      .otherwise((processResult) => {
        console.debug("Fallback to SENSING_FRONT", processResult);

        return "SENSING_FRONT";
      })
  );
}
