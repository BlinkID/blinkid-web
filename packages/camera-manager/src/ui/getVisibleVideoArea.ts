/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { ExtractionArea } from "../core/VideoFrameProcessor";

/**
 * Computes the visible portion of the video (in the video's natural coordinate space)
 * when rendered with object-fit: cover.
 *
 * @param containerWidth - The width of the container.
 * @param containerHeight - The height of the container.
 * @param videoWidth - The width of the video.
 * @param videoHeight - The height of the video.
 * @returns The visible portion of the video.
 */
export function getVisibleVideoArea(
  containerWidth: number,
  containerHeight: number,
  videoWidth: number,
  videoHeight: number,
): ExtractionArea {
  // Compute scale factors for each dimension.
  const scaleX = containerWidth / videoWidth;
  const scaleY = containerHeight / videoHeight;
  // The overall scale used for object-fit: cover.
  const s = Math.max(scaleX, scaleY);

  if (scaleX >= scaleY) {
    // Video is scaled based on its width.
    // The scaled video's width is exactly containerWidth,
    // and its height is videoHeight * s (which is greater than containerHeight).
    // Therefore, in natural coordinates, the full video width is visible,
    // and the visible height is the container's height divided by s.
    const visibleNaturalHeight = Math.round(containerHeight / s);
    const y = Math.round((videoHeight - visibleNaturalHeight) / 2);
    return { x: 0, y: y, width: videoWidth, height: visibleNaturalHeight };
  } else {
    // Video is scaled based on its height.
    // The scaled video's height is exactly containerHeight,
    // and its width is videoWidth * s (which exceeds containerWidth).
    // Therefore, the full video height is visible,
    // and the visible width in natural coordinates is containerWidth divided by s.
    const visibleNaturalWidth = Math.round(containerWidth / s);
    const x = Math.round((videoWidth - visibleNaturalWidth) / 2);
    return { x: x, y: 0, width: visibleNaturalWidth, height: videoHeight };
  }
}
