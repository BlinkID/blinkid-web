/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

// TODO: use https://github.com/hexagon/proper-tags

import { stripIndents } from "common-tags";
import {
  Camera,
  FacingMode,
  VideoResolutionName,
  videoResolutions,
} from "./Camera";
import { isBackCameraName, isFrontCameraName } from "./cameraNames";
import { backDualWideCameraLocalizations } from "./iosCameraNames";
import { asError } from "./utils";

/**
 * A camera error code.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type CameraErrorCode = "PERMISSION_DENIED" | (string & {});

/**
 * A camera error.
 */
export class CameraError extends Error {
  code: CameraErrorCode;

  /**
   * Creates a new camera error.
   *
   * @param message - The error message.
   * @param code - The error code.
   * @param cause - The cause of the error.
   */
  constructor(message: string, code: CameraErrorCode, cause?: Error) {
    super(message);
    this.code = code;
    this.cause = cause;
  }
}

/**
 * Trigger camera permission dialog.
 *
 * @returns resolves when the camera permission is granted
 */
export const askForCameraPermission = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    closeStreamTracks(mediaStream);
  } catch (error) {
    console.log(error);

    const newError = new CameraError(
      "Camera permission not given",
      "PERMISSION_DENIED",
      asError(error),
    );

    throw newError;
  }
};

/**
 * Returns available camera devices on the user's device.
 *
 * @returns An array of `InputDeviceInfo` objects representing the available camera devices.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceInfo for more details.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices for more details.
 */
export const obtainVideoInputDevices = async () => {
  if (!isSecureContext) {
    throw new Error(stripIndents`
      Cameras can only be used in a secure context:
      https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts
    `);
  }

  await askForCameraPermission();

  const allDevices = await navigator.mediaDevices.enumerateDevices();

  const cameraDevices = allDevices.filter((device) => {
    // we don't check `instanceof` because of mocking in tests
    return device.kind === "videoinput";
  });

  return cameraDevices as InputDeviceInfo[];
};

/**
 * Closes all tracks on a media stream.
 *
 * @param stream - The media stream to close.
 */
export const closeStreamTracks = (stream: MediaStream) => {
  const tracks = stream.getTracks();
  for (const track of tracks) {
    track.stop();
  }
};

/**
 * Creates a media stream constraints object.
 *
 * @param resolution - The resolution to create constraints for.
 * @param facing - The facing mode to create constraints for.
 * @param id - The device ID to create constraints for.
 */
export const createConstraints = (
  resolution: VideoResolutionName,
  facing?: FacingMode,
  id?: Camera["deviceInfo"]["deviceId"],
) => {
  const constraints: MediaStreamConstraints = {
    video: {
      deviceId: id ? { exact: id } : undefined,
      frameRate: 30,
      aspectRatio: {
        exact:
          videoResolutions[resolution].width /
          videoResolutions[resolution].height,
      },
      width: {
        ideal: videoResolutions[resolution].width,
      },
      height: {
        ideal: videoResolutions[resolution].height,
      },
      facingMode: facing,
    },
    audio: false,
  };

  return constraints;
};

/**
 * Scores a camera based on its capabilities.
 * Higher score means better camera.
 *
 * @param camera - The camera to score.
 * @returns The score of the camera.
 */
export function scoreCameraCapabilities(camera: Camera): number {
  let score = 0;
  if (camera.torchSupported) score += 1;
  if (camera.singleShotSupported) score += 1;
  return score;
}

/**
 * Filters cameras based on facing mode.
 *
 * @param cameras - The cameras to filter.
 * @param requestedFacing - The facing mode to filter by.
 * @returns The filtered cameras.
 */
export function filterCamerasByFacing(
  cameras: Camera[],
  requestedFacing: FacingMode,
): Camera[] {
  return cameras.filter((camera) => {
    if (requestedFacing === "back" || requestedFacing === undefined) {
      return isBackCameraName(camera.name);
    } else {
      return isFrontCameraName(camera.name);
    }
  });
}

/**
 * Finds the ideal camera based on the provided constraints.
 *
 * @param cameras - Available `Camera`s on the device.
 * @param resolution - Ideal resolution for the camera stream, will fall back to the closest available resolution.
 * @param requestedFacing - Ideal facing mode for the camera stream. If not provided, will default to back camera.
 * If no facing mode is available, will return a best effort match.
 *
 * @returns A `Camera` instance that matches the provided constraints, with an active stream.
 */
export const findIdealCamera = async (
  cameras: Camera[],
  resolution: VideoResolutionName = "4k",
  requestedFacing: FacingMode = "back",
): Promise<Camera> => {
  // if there are no cameras, throw an error
  if (cameras.length === 0) {
    throw new Error("No cameras found");
  }

  // if there's only one camera, we can return it immediately
  if (cameras.length === 1) {
    await cameras[0].startStream(resolution);
    return cameras[0];
  }

  // Filter cameras by facing mode
  let cameraPool = filterCamerasByFacing(cameras, requestedFacing);

  // if there's only one camera in the pool and it matches the requested facing
  // we can return it immediately
  if (cameraPool.length === 1) {
    await cameraPool[0].startStream(resolution);
    return cameraPool[0];
  }

  // if there are no cameras in the pool, use all cameras
  if (cameraPool.length === 0) {
    console.debug("No camera found with requested facing, using all cameras");
    cameraPool = cameras;
  }

  // early exit for iPhone 12+
  // Dual wide camera is the best, if it exists and requested facing is back
  if (requestedFacing === "back") {
    const dualWideCamera = cameraPool.find((camera) =>
      backDualWideCameraLocalizations.includes(camera.name),
    );

    if (dualWideCamera) {
      await dualWideCamera.startStream(resolution);
      return dualWideCamera;
    }
  }

  // if we're looking for a front camera, return the last one in the pool
  if (requestedFacing === "front") {
    const lastCamera = cameraPool[cameraPool.length - 1];
    await lastCamera.startStream(resolution);
    return lastCamera;
  }

  // Score and test each camera
  const cameraScores = new Map<Camera, number>();
  let bestCamera: Camera | undefined;
  let maxScore = -Infinity;

  // we iterate in reverse order to prioritize the last camera
  // this is usually the best camera on Android
  for (let i = cameraPool.length - 1; i >= 0; i--) {
    const camera = cameraPool[i];

    try {
      // Start stream to detect capabilities
      await camera.startStream(resolution);

      // Score the camera now that we have its capabilities
      const score = scoreCameraCapabilities(camera);
      cameraScores.set(camera, score);

      // Update best camera if this one has a higher score
      if (score > maxScore) {
        // Stop stream on previous best camera if it exists
        if (bestCamera && bestCamera !== camera) {
          bestCamera.stopStream();
        }
        maxScore = score;
        bestCamera = camera;
      } else {
        // Not the best camera, stop its stream
        camera.stopStream();
      }

      // Perfect match - has both torch and single shot support
      if (score === 2) {
        console.debug("Found camera with all capabilities, returning early");
        return camera;
      }
    } catch (error) {
      console.warn(`Failed to test camera ${camera.name}:`, error);
      // Stop stream if it was started
      camera.stopStream();
    }
  }

  // Return the best camera we found
  if (bestCamera) {
    return bestCamera;
  }

  // If we haven't found any working camera, try one last time with the first camera
  const firstCamera = cameraPool[0];
  await firstCamera.startStream(resolution);
  return firstCamera;
};

/**
 * Creates an array of `Camera` instances with stream from native `deviceInfo` objects.
 *
 * @param cameras - The input device info to create cameras from.
 * @returns The created cameras.
 */
export function createCameras(cameras: InputDeviceInfo[]) {
  const camerasWithStream: Camera[] = [];

  for (const device of cameras) {
    const camera = new Camera(device);
    if (camera !== null) {
      camerasWithStream.push(camera);
    }
  }

  return camerasWithStream;
}
