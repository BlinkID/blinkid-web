/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { expect, test, describe } from "vitest";
import {
  BlinkIdUiStateKey,
  getUiStateKey,
  PartialProcessResult,
} from "./blinkid-ui-state";
import {
  Country,
  defaultSessionSettings,
  DetectionStatus,
  DocumentRotation,
  ImageAnalysisLightingStatus,
  ScanningSettings,
  ScanningSide,
} from "@microblink/blinkid-core";
import { merge } from "merge-anything";

const getMergedSettings = (
  overrides: Partial<ScanningSettings> = {},
): ScanningSettings => {
  return merge(defaultSessionSettings.scanningSettings, overrides);
};

const createProcessResult = (overrides = {}): PartialProcessResult => {
  return merge(
    {
      inputImageAnalysisResult: {},
      resultCompleteness: {},
    },
    overrides,
  );
};

describe("getUiStateKey", () => {
  describe("Document Capture States", () => {
    test("should return DOCUMENT_CAPTURED when document is fully scanned", () => {
      const processResult = createProcessResult({
        resultCompleteness: { scanningStatus: "document-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("DOCUMENT_CAPTURED");
    });

    test("should return FLIP_CARD when one side is scanned", () => {
      const processResult = createProcessResult({
        resultCompleteness: { scanningStatus: "side-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("FLIP_CARD");
    });

    test("should return SCAN_BARCODE when scanning barcode is in progress", () => {
      const processResult = createProcessResult({
        resultCompleteness: { scanningStatus: "scanning-barcode-in-progress" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("SCAN_BARCODE");
    });
  });

  describe("Document Framing States", () => {
    test.each<{ status: DetectionStatus; expected: BlinkIdUiStateKey }>([
      {
        status: "camera-too-close",
        expected: "DOCUMENT_FRAMING_CAMERA_TOO_CLOSE",
      },
      { status: "camera-too-far", expected: "DOCUMENT_FRAMING_CAMERA_TOO_FAR" },
      {
        status: "camera-angle-too-steep",
        expected: "DOCUMENT_FRAMING_CAMERA_ANGLE_TOO_STEEP",
      },
      {
        status: "document-too-close-to-camera-edge",
        expected: "DOCUMENT_TOO_CLOSE_TO_FRAME_EDGE",
      },
    ])(
      "should return $expected when document detection status is $status",
      ({ status, expected }) => {
        const processResult = createProcessResult({
          inputImageAnalysisResult: {
            documentDetectionStatus: status,
          },
        });
        const settings = getMergedSettings();

        const result = getUiStateKey(processResult, settings);

        expect(result).toBe<BlinkIdUiStateKey>(expected);
      },
    );
  });

  describe("Image Quality States", () => {
    describe("Blur Detection", () => {
      test.each<{
        skipImagesWithBlur: boolean;
        expected: BlinkIdUiStateKey;
      }>([
        { skipImagesWithBlur: true, expected: "BLUR_DETECTED" },
        { skipImagesWithBlur: false, expected: "SENSING_FRONT" },
      ])(
        "should return $expected when blur is detected and skipImagesWithBlur is $skipImagesWithBlur",
        ({ skipImagesWithBlur, expected }) => {
          const processResult = createProcessResult({
            inputImageAnalysisResult: {
              processingStatus: "image-preprocessing-failed",
              blurDetectionStatus: "detected",
            },
          });
          const settings = getMergedSettings({ skipImagesWithBlur });

          const result = getUiStateKey(processResult, settings);

          expect(result).toBe<BlinkIdUiStateKey>(expected);
        },
      );
    });

    describe("Glare Detection", () => {
      test.each<{
        skipImagesWithGlare: boolean;
        expected: BlinkIdUiStateKey;
      }>([
        { skipImagesWithGlare: true, expected: "GLARE_DETECTED" },
        { skipImagesWithGlare: false, expected: "SENSING_FRONT" },
      ])(
        "should return $expected when glare is detected and skipImagesWithGlare is $skipImagesWithGlare",
        ({ skipImagesWithGlare, expected }) => {
          const processResult = createProcessResult({
            inputImageAnalysisResult: {
              processingStatus: "image-preprocessing-failed",
              glareDetectionStatus: "detected",
            },
          });
          const settings = getMergedSettings({ skipImagesWithGlare });

          const result = getUiStateKey(processResult, settings);

          expect(result).toBe<BlinkIdUiStateKey>(expected);
        },
      );
    });

    describe("Blur and Glare combined", () => {
      test("should return SENSING_FRONT when both blur and glare are detected but skip settings are disabled", () => {
        const processResult = createProcessResult({
          inputImageAnalysisResult: {
            processingStatus: "image-preprocessing-failed",
            blurDetectionStatus: "detected",
            glareDetectionStatus: "detected",
          },
        });
        const settings = getMergedSettings({
          skipImagesWithBlur: false,
          skipImagesWithGlare: false,
        });

        const result = getUiStateKey(processResult, settings);

        expect(result).toBe<BlinkIdUiStateKey>("SENSING_FRONT");
      });
    });

    describe("Lighting Conditions", () => {
      test.each<{
        status: ImageAnalysisLightingStatus;
        expected: BlinkIdUiStateKey;
        skipImagesWithInadequateLightingConditions: boolean;
      }>([
        {
          status: "too-dark",
          expected: "TOO_DARK",
          skipImagesWithInadequateLightingConditions: true,
        },
        {
          status: "too-dark",
          expected: "SENSING_FRONT",
          skipImagesWithInadequateLightingConditions: false,
        },
        {
          status: "too-bright",
          expected: "TOO_BRIGHT",
          skipImagesWithInadequateLightingConditions: true,
        },
        {
          status: "too-bright",
          expected: "SENSING_FRONT",
          skipImagesWithInadequateLightingConditions: false,
        },
      ])(
        "should return $expected when lighting status is $status and skipImagesWithInadequateLightingConditions is $skipImagesWithInadequateLightingConditions",
        ({ status, expected, skipImagesWithInadequateLightingConditions }) => {
          const processResult = createProcessResult({
            inputImageAnalysisResult: {
              processingStatus: "image-preprocessing-failed",
              documentLightingStatus: status,
            },
          });
          const settings = getMergedSettings({
            skipImagesWithInadequateLightingConditions:
              skipImagesWithInadequateLightingConditions,
          });

          const result = getUiStateKey(processResult, settings);

          expect(result).toBe<BlinkIdUiStateKey>(expected);
        },
      );
    });
  });

  describe("Passport Sensing States", () => {
    // This case can actually never happen.
    test("should return SENSING_DATA_PAGE when scanning first side of passport", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          scanningSide: "first",
          documentClassInfo: { type: "passport" },
        },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("SENSING_DATA_PAGE");
    });

    test.each<{
      rotation: DocumentRotation;
      expected: BlinkIdUiStateKey;
      country?: Country;
    }>([
      { rotation: "zero", expected: "SENSING_TOP_PAGE" },
      { rotation: "not-available", expected: "SENSING_TOP_PAGE" },
      { rotation: "upside-down", expected: "SENSING_TOP_PAGE" },
      { rotation: "counter-clockwise-90", expected: "SENSING_LEFT_PAGE" },
      { rotation: "clockwise-90", expected: "SENSING_RIGHT_PAGE" },
      { rotation: "zero", expected: "SENSING_LAST_PAGE", country: "india" },
      {
        rotation: "not-available",
        expected: "SENSING_LAST_PAGE",
        country: "india",
      },
      {
        rotation: "upside-down",
        expected: "SENSING_LAST_PAGE",
        country: "usa",
      },
      {
        rotation: "counter-clockwise-90",
        expected: "SENSING_LAST_PAGE",
        country: "usa",
      },
      {
        rotation: "clockwise-90",
        expected: "SENSING_LAST_PAGE",
        country: "usa",
      },
    ])(
      "should return $expected when scanning second side of passport with rotation $rotation and country $country",
      ({ rotation, expected, country }) => {
        const processResult = createProcessResult({
          inputImageAnalysisResult: {
            scanningSide: "second",
            documentClassInfo: { type: "passport", country },
            documentRotation: rotation,
          },
        });
        const settings = getMergedSettings();

        const result = getUiStateKey(processResult, settings);

        expect(result).toBe<BlinkIdUiStateKey>(expected);
      },
    );
  });

  describe("Passport Navigation States", () => {
    test.each<{
      rotation: DocumentRotation;
      expected: BlinkIdUiStateKey;
      country?: Country;
    }>([
      { rotation: "zero", expected: "MOVE_TOP" },
      { rotation: "counter-clockwise-90", expected: "MOVE_LEFT" },
      { rotation: "clockwise-90", expected: "MOVE_RIGHT" },
      { rotation: "zero", expected: "MOVE_LAST_PAGE", country: "india" },
      {
        rotation: "counter-clockwise-90",
        expected: "MOVE_LAST_PAGE",
        country: "india",
      },
      { rotation: "clockwise-90", expected: "MOVE_LAST_PAGE", country: "usa" },
    ])(
      "should return $expected when passport document rotation is $rotation and country $country",
      ({ rotation, expected, country }) => {
        const processResult = createProcessResult({
          resultCompleteness: {
            scanningStatus: "side-scanned",
          },
          inputImageAnalysisResult: {
            documentClassInfo: { type: "passport", country },
            documentRotation: rotation,
          },
        });
        const settings = getMergedSettings();

        const result = getUiStateKey(processResult, settings);

        expect(result).toBe<BlinkIdUiStateKey>(expected);
      },
    );
  });

  describe("Wrong Passport Page States", () => {
    test.each<{
      rotation: DocumentRotation;
      expected: BlinkIdUiStateKey;
      country?: Country;
    }>([
      { rotation: "zero", expected: "WRONG_TOP_PAGE" },
      { rotation: "upside-down", expected: "WRONG_TOP_PAGE" },
      { rotation: "not-available", expected: "WRONG_TOP_PAGE" },
      { rotation: "counter-clockwise-90", expected: "WRONG_LEFT_PAGE" },
      { rotation: "clockwise-90", expected: "WRONG_RIGHT_PAGE" },
      { rotation: "zero", expected: "WRONG_LAST_PAGE", country: "india" },
      {
        rotation: "upside-down",
        expected: "WRONG_LAST_PAGE",
        country: "india",
      },
      {
        rotation: "not-available",
        expected: "WRONG_LAST_PAGE",
        country: "usa",
      },
      {
        rotation: "counter-clockwise-90",
        expected: "WRONG_LAST_PAGE",
        country: "usa",
      },
      { rotation: "clockwise-90", expected: "WRONG_LAST_PAGE", country: "usa" },
    ])(
      "should return $expected when scanning wrong side with rotation $rotation and country $country",
      ({ rotation, expected, country }) => {
        const processResult = createProcessResult({
          inputImageAnalysisResult: {
            scanningSide: "second",
            processingStatus: "scanning-wrong-side",
            documentClassInfo: { type: "passport", country },
            documentRotation: rotation,
          },
        });
        const settings = getMergedSettings();

        const result = getUiStateKey(processResult, settings);

        expect(result).toBe<BlinkIdUiStateKey>(expected);
      },
    );
  });

  describe("Occlusion States", () => {
    test("should return OCCLUDED when document is partially visible", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          documentDetectionStatus: "document-partially-visible",
        },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("OCCLUDED");
    });

    test.each<{
      skipImagesOccludedByHand: boolean;
      expected: BlinkIdUiStateKey;
    }>([
      { skipImagesOccludedByHand: true, expected: "OCCLUDED" },
      { skipImagesOccludedByHand: false, expected: "SENSING_FRONT" },
    ])(
      "should return $expected when document is occluded by hand and skipImagesOccludedByHand is $skipImagesOccludedByHand",
      ({ skipImagesOccludedByHand, expected }) => {
        const processResult = createProcessResult({
          inputImageAnalysisResult: { documentHandOcclusionStatus: "detected" },
        });
        const settings = getMergedSettings({ skipImagesOccludedByHand });

        const result = getUiStateKey(processResult, settings);

        expect(result).toBe<BlinkIdUiStateKey>(expected);
      },
    );

    test.each<{
      missingMandatoryFields: string[];
      expected: BlinkIdUiStateKey;
    }>([
      {
        missingMandatoryFields: ["firstName", "lastName"],
        expected: "OCCLUDED",
      },
      { missingMandatoryFields: [], expected: "SENSING_FRONT" },
    ])(
      "should return $expected when missingMandatoryFields is $missingMandatoryFields",
      ({ missingMandatoryFields, expected }) => {
        const processResult = createProcessResult({
          inputImageAnalysisResult: { missingMandatoryFields },
        });
        const settings = getMergedSettings();

        const result = getUiStateKey(processResult, settings);

        expect(result).toBe<BlinkIdUiStateKey>(expected);
      },
    );

    test("should handle multiple occlusion conditions simultaneously", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          documentHandOcclusionStatus: "detected",
          documentDetectionStatus: "document-partially-visible",
          missingMandatoryFields: ["firstName", "lastName"],
        },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("OCCLUDED");
    });
  });

  describe("Image Extraction Failures", () => {
    test("should return FACE_PHOTO_OCCLUDED when face photo is not fully visible", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          processingStatus: "image-return-failed",
          imageExtractionFailures: ["face"],
        },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("FACE_PHOTO_OCCLUDED");
    });
  });

  describe("Document Side Detection", () => {
    test.each([{ scanningSide: "first" }, { scanningSide: "second" }])(
      "should return WRONG_SIDE when scanning wrong side ($scanningSide)",
      ({ scanningSide }) => {
        const processResult = createProcessResult({
          inputImageAnalysisResult: {
            scanningSide,
            processingStatus: "scanning-wrong-side",
          },
        });
        const settings = getMergedSettings();

        const result = getUiStateKey(processResult, settings);

        expect(result).toBe<BlinkIdUiStateKey>("WRONG_SIDE");
      },
    );

    test.each<{
      scanningSide: ScanningSide;
      expected: BlinkIdUiStateKey;
    }>([
      { scanningSide: "first", expected: "SENSING_FRONT" },
      { scanningSide: "second", expected: "SENSING_BACK" },
    ])(
      "should return $expected when sensing $scanningSide side with failed detection",
      ({ scanningSide, expected }) => {
        const processResult = createProcessResult({
          inputImageAnalysisResult: {
            scanningSide,
            documentDetectionStatus: "failed",
          },
          resultCompleteness: {
            scanningStatus: "scanning-side-in-progress",
          },
        });
        const settings = getMergedSettings();

        const result = getUiStateKey(processResult, settings);

        expect(result).toBe<BlinkIdUiStateKey>(expected);
      },
    );
  });

  describe("Special States", () => {
    test("should return UNSUPPORTED_DOCUMENT when document is unsupported", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: { processingStatus: "unsupported-document" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("UNSUPPORTED_DOCUMENT");
    });

    test("should return SENSING_FRONT as fallback when no specific conditions are met", () => {
      const processResult = createProcessResult();
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("SENSING_FRONT");
    });
  });

  describe("Priority Rules", () => {
    test("should prioritize DOCUMENT_CAPTURED over framing issues", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: { documentDetectionStatus: "camera-too-far" },
        resultCompleteness: { scanningStatus: "document-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("DOCUMENT_CAPTURED");
    });

    test("should prioritize DOCUMENT_CAPTURED over occlusion issues", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: { documentHandOcclusionStatus: "detected" },
        resultCompleteness: { scanningStatus: "document-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("DOCUMENT_CAPTURED");
    });

    test("should prioritize DOCUMENT_CAPTURED over blur issues", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          processingStatus: "image-preprocessing-failed",
          blurDetectionStatus: "detected",
        },
        resultCompleteness: { scanningStatus: "document-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("DOCUMENT_CAPTURED");
    });

    test("should prioritize FLIP_CARD over blur detection", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          processingStatus: "image-preprocessing-failed",
          blurDetectionStatus: "detected",
        },
        resultCompleteness: { scanningStatus: "side-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("FLIP_CARD");
    });

    test("should prioritize FLIP_CARD over glare detection", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: { glareDetectionStatus: "detected" },
        resultCompleteness: { scanningStatus: "side-scanned" },
      });
      const settings = getMergedSettings({ skipImagesWithGlare: true });

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("FLIP_CARD");
    });

    test("should prioritize FLIP_CARD over wrong side detection", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: { processingStatus: "scanning-wrong-side" },
        resultCompleteness: { scanningStatus: "side-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("FLIP_CARD");
    });

    test("should prioritize UNSUPPORTED_DOCUMENT over side captured", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: { processingStatus: "unsupported-document" },
        resultCompleteness: { scanningStatus: "side-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("UNSUPPORTED_DOCUMENT");
    });

    test("should prioritize lighting issues over GLARE_DETECTED", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          processingStatus: "image-preprocessing-failed",
          documentLightingStatus: "too-dark",
          glareDetectionStatus: "detected",
        },
      });
      const settings = getMergedSettings({
        skipImagesWithGlare: true,
        skipImagesWithInadequateLightingConditions: true,
      });

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("TOO_DARK");
    });

    test("should prioritize GLARE_DETECTED over BLUR_DETECTED when both are detected", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          processingStatus: "image-preprocessing-failed",
          blurDetectionStatus: "detected",
          glareDetectionStatus: "detected",
        },
      });
      const settings = getMergedSettings({
        skipImagesWithBlur: true,
        skipImagesWithGlare: true,
      });

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("GLARE_DETECTED");
    });

    test("should prioritize DOCUMENT_CAPTURED over passport navigation states", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          processingStatus: "awaiting-other-side",
          documentClassInfo: { type: "passport" },
          documentRotation: "zero",
        },
        resultCompleteness: { scanningStatus: "document-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("DOCUMENT_CAPTURED");
    });

    // Passports are more specific than other documents, so this test is
    // not valid.
    test.skip("should prioritize FLIP_CARD over wrong passport page states", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          scanningSide: "second",
          processingStatus: "scanning-wrong-side",
          documentClassInfo: { type: "passport" },
          documentRotation: "zero",
        },
        resultCompleteness: { scanningStatus: "side-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("FLIP_CARD");
    });

    test("should prioritize WRONG_TOP_PAGE over blur detection for passports", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          scanningSide: "second",
          processingStatus: "scanning-wrong-side",
          documentClassInfo: { type: "passport" },
          documentRotation: "zero",
          blurDetectionStatus: "detected",
        },
      });
      const settings = getMergedSettings({ skipImagesWithBlur: true });

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("WRONG_TOP_PAGE");
    });

    test("should prioritize DOCUMENT_CAPTURED over all other issues", () => {
      const processResult = createProcessResult({
        inputImageAnalysisResult: {
          blurDetectionStatus: "detected",
          glareDetectionStatus: "detected",
          documentHandOcclusionStatus: "detected",
          documentDetectionStatus: "camera-too-far",
          processingStatus: "scanning-wrong-side",
          documentLightingStatus: "too-dark",
        },
        resultCompleteness: { scanningStatus: "document-scanned" },
      });
      const settings = getMergedSettings();

      const result = getUiStateKey(processResult, settings);

      expect(result).toBe<BlinkIdUiStateKey>("DOCUMENT_CAPTURED");
    });
  });
});
