/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { BlinkIdScanningResult, ScanningSide } from "@microblink/blinkid-wasm";

/**
 * Extracts the input image for a given side from the scanning result.
 *
 * @param blinkIdScanningResult - The scanning result.
 * @param side - The side to extract the input image for.
 * @returns The input image for the given side.
 */
export function extractSideInputImage(
  blinkIdScanningResult: BlinkIdScanningResult,
  side: ScanningSide,
): ImageData | null {
  const sideIndex = side === "first" ? 0 : 1;
  return blinkIdScanningResult.subResults[sideIndex]?.inputImage ?? null;
}

/**
 * Extracts the barcode input image from the scanning result.
 *
 * @param blinkIdScanningResult - The scanning result.
 * @returns The barcode input image.
 */
export function extractBarcodeImage(
  blinkIdScanningResult: BlinkIdScanningResult,
): ImageData | null {
  return (
    blinkIdScanningResult.subResults.find(
      (subResult) => subResult.barcodeInputImage,
    )?.barcodeInputImage ?? null
  );
}

/**
 * Extracts the document image for a given side from the scanning result.
 *
 * @param blinkIdScanningResult - The scanning result.
 * @param side - The side to extract the document image for.
 * @returns The document image for the given side.
 */
export function extractSideDocumentImage(
  blinkIdScanningResult: BlinkIdScanningResult,
  side: ScanningSide,
): ImageData | null {
  const sideIndex = side === "first" ? 0 : 1;
  return blinkIdScanningResult.subResults[sideIndex]?.documentImage ?? null;
}

/**
 * Extracts the face image from the scanning result.
 *
 * @param blinkIdScanningResult - The scanning result.
 * @returns The face image.
 */
export function extractFaceImage(
  blinkIdScanningResult: BlinkIdScanningResult,
): ImageData | null {
  return (
    blinkIdScanningResult.subResults.find((subResult) => subResult.faceImage)
      ?.faceImage?.image ?? null
  );
}

/**
 * Extracts the signature image from the scanning result.
 *
 * @param blinkIdScanningResult - The scanning result.
 * @returns The signature image.
 */
export function extractSignatureImage(
  blinkIdScanningResult: BlinkIdScanningResult,
): ImageData | null {
  return (
    blinkIdScanningResult.subResults.find(
      (subResult) => subResult.signatureImage,
    )?.signatureImage?.image ?? null
  );
}
