/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, expect, it } from "vitest";
import {
  extractSideInputImage,
  extractBarcodeImage,
  extractSideDocumentImage,
  extractFaceImage,
  extractSignatureImage,
} from "./utils";
import { BlinkIdScanningResult } from "@microblink/blinkid-wasm";

// Mock ImageData for testing
const createMockImageData = () => new ImageData(1, 1);

// Mock factory for SingleSideScanningResult
const createMockSingleSideScanningResult = (overrides = {}) => ({
  inputImage: createMockImageData(),
  documentImage: createMockImageData(),
  faceImage: { image: createMockImageData() },
  signatureImage: { image: createMockImageData() },
  barcodeInputImage: createMockImageData(),
  ...overrides,
});

// Mock factory for BlinkIdScanningResult
const createMockBlinkIdScanningResult = (
  overrides = {},
): BlinkIdScanningResult => ({
  subResults: [
    createMockSingleSideScanningResult(),
    createMockSingleSideScanningResult(),
  ],
  documentClassInfo: {
    country: "usa",
    type: "id",
    region: undefined,
  },
  ...overrides,
});

describe("extractSideInputImage", () => {
  it("should extract first side input image", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ inputImage: expectedImage }),
        createMockSingleSideScanningResult(),
      ],
    });

    const image = extractSideInputImage(result, "first");

    expect(image).toBe(expectedImage);
  });

  it("should extract second side input image", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult(),
        createMockSingleSideScanningResult({ inputImage: expectedImage }),
      ],
    });

    const image = extractSideInputImage(result, "second");

    expect(image).toBe(expectedImage);
  });

  it("should return null when side index is out of bounds", () => {
    const result = createMockBlinkIdScanningResult({
      subResults: [createMockSingleSideScanningResult()], // Only one side
    });

    const image = extractSideInputImage(result, "second");

    expect(image).toBeNull();
  });

  it("should return null when input image is undefined", () => {
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ inputImage: undefined }),
      ],
    });

    const image = extractSideInputImage(result, "first");

    expect(image).toBeNull();
  });
});

describe("extractBarcodeImage", () => {
  it("should extract barcode image from first side", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({
          barcodeInputImage: expectedImage,
        }),
        createMockSingleSideScanningResult({ barcodeInputImage: undefined }),
      ],
    });

    const image = extractBarcodeImage(result);

    expect(image).toBe(expectedImage);
  });

  it("should extract barcode image from second side", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ barcodeInputImage: undefined }),
        createMockSingleSideScanningResult({
          barcodeInputImage: expectedImage,
        }),
      ],
    });

    const image = extractBarcodeImage(result);

    expect(image).toBe(expectedImage);
  });

  it("should return null when no barcode image exists", () => {
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ barcodeInputImage: undefined }),
        createMockSingleSideScanningResult({ barcodeInputImage: undefined }),
      ],
    });

    const image = extractBarcodeImage(result);

    expect(image).toBeNull();
  });
});

describe("extractSideDocumentImage", () => {
  it("should extract first side document image", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ documentImage: expectedImage }),
        createMockSingleSideScanningResult(),
      ],
    });

    const image = extractSideDocumentImage(result, "first");

    expect(image).toBe(expectedImage);
  });

  it("should extract second side document image", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult(),
        createMockSingleSideScanningResult({ documentImage: expectedImage }),
      ],
    });

    const image = extractSideDocumentImage(result, "second");

    expect(image).toBe(expectedImage);
  });

  it("should return null when side index is out of bounds", () => {
    const result = createMockBlinkIdScanningResult({
      subResults: [createMockSingleSideScanningResult()], // Only one side
    });

    const image = extractSideDocumentImage(result, "second");

    expect(image).toBeNull();
  });

  it("should return null when document image is undefined", () => {
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ documentImage: undefined }),
      ],
    });

    const image = extractSideDocumentImage(result, "first");

    expect(image).toBeNull();
  });
});

describe("extractFaceImage", () => {
  it("should extract face image from first side", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({
          faceImage: { image: expectedImage },
        }),
        createMockSingleSideScanningResult({ faceImage: undefined }),
      ],
    });

    const image = extractFaceImage(result);

    expect(image).toBe(expectedImage);
  });

  it("should extract face image from second side", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ faceImage: undefined }),
        createMockSingleSideScanningResult({
          faceImage: { image: expectedImage },
        }),
      ],
    });

    const image = extractFaceImage(result);

    expect(image).toBe(expectedImage);
  });

  it("should return null when no face image exists", () => {
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ faceImage: undefined }),
        createMockSingleSideScanningResult({ faceImage: undefined }),
      ],
    });

    const image = extractFaceImage(result);

    expect(image).toBeNull();
  });
});

describe("extractSignatureImage", () => {
  it("should extract signature image from first side", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({
          signatureImage: { image: expectedImage },
        }),
        createMockSingleSideScanningResult({ signatureImage: undefined }),
      ],
    });

    const image = extractSignatureImage(result);

    expect(image).toBe(expectedImage);
  });

  it("should extract signature image from second side", () => {
    const expectedImage = createMockImageData();
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ signatureImage: undefined }),
        createMockSingleSideScanningResult({
          signatureImage: { image: expectedImage },
        }),
      ],
    });

    const image = extractSignatureImage(result);

    expect(image).toBe(expectedImage);
  });

  it("should return null when no signature image exists", () => {
    const result = createMockBlinkIdScanningResult({
      subResults: [
        createMockSingleSideScanningResult({ signatureImage: undefined }),
        createMockSingleSideScanningResult({ signatureImage: undefined }),
      ],
    });

    const image = extractSignatureImage(result);

    expect(image).toBeNull();
  });
});
