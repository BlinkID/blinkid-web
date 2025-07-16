[**@microblink/camera-manager**](../README.md)

---

[@microblink/camera-manager](../README.md) / CameraManagerStore

# Type Alias: CameraManagerStore

> **CameraManagerStore** = `object`

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:18](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

The camera manager store.

## Properties

### cameras

> **cameras**: [`Camera`](../classes/Camera.md)[]

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:27](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

The list of cameras that are available to the user.

---

### errorState?

> `optional` **errorState**: `Error` \| `CameraError`

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:63](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

If the Camera manager has encountered an error, this will be set to the error.

---

### facingFilter?

> `optional` **facingFilter**: [`FacingMode`](FacingMode.md)[]

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:33](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

The facing mode filter that will be used to filter the available cameras.
Can be a single facing mode or an array of facing modes.

---

### isQueryingCameras

> **isQueryingCameras**: `boolean`

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:53](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

Indicates if camera list is currently being queried.

---

### isSwappingCamera

> **isSwappingCamera**: `boolean`

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:48](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

Indicates if the camera is currently being swapped.

---

### mirrorX

> **mirrorX**: `boolean`

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:58](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

Indicates if the captured frames will be mirrored horizontally

---

### playbackState

> **playbackState**: [`PlaybackState`](PlaybackState.md)

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:43](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

Capturing / playing / idle.

---

### selectedCamera?

> `optional` **selectedCamera**: [`Camera`](../classes/Camera.md)

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:38](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

The currently selected camera.

---

### videoElement?

> `optional` **videoElement**: `HTMLVideoElement`

Defined in: [packages/camera-manager/src/core/cameraManagerStore.ts:22](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/cameraManagerStore.ts)

The video element that will display the camera stream.
