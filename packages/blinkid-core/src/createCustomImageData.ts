/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Creates a custom ImageData object with the same properties as the original ImageData.
 * This is a workaround for the performance issue in Chromium browsers.
 *
 * @param imageData - The original ImageData object to be wrapped.
 * @returns A custom ImageData object with the same properties.
 */
export function createCustomImageData(imageData: ImageData): ImageData {
  // fix for postmessage performance
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1439768&q=&can=4
  const customImageData = {
    /**
     * Returns the one-dimensional array containing the data in RGBA order, as integers in the range 0 to 255.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/data)
     */
    data: imageData.data,
    /**
     * Returns the actual dimensions of the data in the ImageData object, in pixels.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/width)
     */
    width: imageData.width,
    /**
     * Returns the actual dimensions of the data in the ImageData object, in pixels.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/height)
     */
    height: imageData.height,
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/colorSpace) */
    colorSpace: imageData.colorSpace,
  } satisfies ImageData;

  return customImageData;
}
