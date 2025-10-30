/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * The fit mode.
 */

export type FitMode = "contain" | "cover";

/**
 * Determines the fit mode for the video element based on the container and video dimensions.
 *
 * `cover` is only used when the cropped fraction is less than 10%.
 *
 * When using object-fit: cover, the video is scaled by
 *   `s = max(Cw / Vw, Ch / Vh)`
 * so that one dimension exactly fills the container while the other overflows.
 * The overflowing dimension is then centered and cropped.
 *
 * For the dimension that overflows:
 * - If width is the dominant factor `(Cw/Vw > Ch/Vh)`, then
 *    - `visible dimension = s * Vh`     (actual scaled video height)
 *    - `visible fraction = containerHeight / (s * Vh)`
 *    - `croppedFraction = 1 - (containerHeight / (s * Vh))`
 *
 * - Otherwise, if height is dominant, then
 *    - `visible dimension = s * Vw`     (actual scaled video width)
 *    - `visible fraction = containerWidth / (s * Vw)`
 *    - `croppedFraction = 1 - (containerWidth / (s * Vw))`
 *
 * The croppedFraction represents the relative amount (fraction) of the video that is cropped
 * along the overflowing dimension. We choose "cover" only when the croppedFraction is below 10%.
 *
 * @param Cw - The container width.
 * @param Ch - The container height.
 * @param Vw - The video width.
 * @param Vh - The video height.
 * @returns The fit mode.
 */
export const determineFitMode = (
  Cw: number,
  Ch: number,
  Vw: number,
  Vh: number,
): FitMode => {
  // Compute the overall scale used for object-fit: cover.
  // We want to fill the container completely, so we scale by the maximum required factor.
  const scaleCover = Math.max(Cw / Vw, Ch / Vh);

  // Determine the cropped fraction for the overflowing dimension.
  let croppedFraction = 0;
  if (Cw / Vw > Ch / Vh) {
    // When Cw/Vw > Ch/Vh, the video is scaled by width.
    // The width exactly fills the container.
    // The height becomes: scaleCover * Vh, which is greater than Ch.
    // The visible fraction of the video's height is Ch / (scaleCover * Vh).
    // Hence, the cropped fraction is the remaining part.
    const visible = scaleCover * Vh;
    croppedFraction = 1 - Ch / visible;
  } else {
    // When Cw/Vw <= Ch/Vh, the video is scaled by height.
    // The height exactly fills the container.
    // The width becomes: scaleCover * Vw, which is greater than Cw.
    // The visible fraction of the video's width is Cw / (scaleCover * Vw).
    // Hence, the cropped fraction is the remaining part.
    const visible = scaleCover * Vw;
    croppedFraction = 1 - Cw / visible;
  }

  // Use 'cover' if the cropped fraction is less than 10%; otherwise use 'contain'.
  if (croppedFraction < 0.1) {
    return "cover";
  } else {
    return "contain";
  }
};
