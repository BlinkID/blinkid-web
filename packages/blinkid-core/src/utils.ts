/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { BlinkIdScanningResult, ScanningSide } from "@microblink/blinkid-wasm";

export function extractSideInputImage(
  blinkIdScanningResult: BlinkIdScanningResult,
  side: ScanningSide,
): ImageData | null {
  const sideIndex = side === "first" ? 0 : 1;
  return blinkIdScanningResult.subResults[sideIndex]?.inputImage ?? null;
}

export function extractBarcodeImage(
  blinkIdScanningResult: BlinkIdScanningResult,
): ImageData | null {
  return (
    blinkIdScanningResult.subResults.find(
      (subResult) => subResult.barcodeInputImage,
    )?.barcodeInputImage ?? null
  );
}

export function extractSideDocumentImage(
  blinkIdScanningResult: BlinkIdScanningResult,
  side: ScanningSide,
): ImageData | null {
  const sideIndex = side === "first" ? 0 : 1;
  return blinkIdScanningResult.subResults[sideIndex]?.documentImage ?? null;
}

export function extractFaceImage(
  blinkIdScanningResult: BlinkIdScanningResult,
): ImageData | null {
  return (
    blinkIdScanningResult.subResults.find((subResult) => subResult.faceImage)
      ?.faceImage?.image ?? null
  );
}

export function extractSignatureImage(
  blinkIdScanningResult: BlinkIdScanningResult,
): ImageData | null {
  return (
    blinkIdScanningResult.subResults.find(
      (subResult) => subResult.signatureImage,
    )?.signatureImage?.image ?? null
  );
}
