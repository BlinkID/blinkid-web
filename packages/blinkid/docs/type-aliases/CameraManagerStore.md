[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / CameraManagerStore

# Type Alias: CameraManagerStore

> **CameraManagerStore** = `object`

The camera manager store.

## Properties

### cameras

> **cameras**: [`Camera`](../classes/Camera.md)[]

The list of cameras that are available to the user.

***

### errorState?

> `optional` **errorState**: `Error` \| `CameraError`

If the Camera manager has encountered an error, this will be set to the error.

***

### facingFilter?

> `optional` **facingFilter**: [`FacingMode`](FacingMode.md)[]

The facing mode filter that will be used to filter the available cameras.
Can be a single facing mode or an array of facing modes.

***

### isQueryingCameras

> **isQueryingCameras**: `boolean`

Indicates if camera list is currently being queried.

***

### isSwappingCamera

> **isSwappingCamera**: `boolean`

Indicates if the camera is currently being swapped.

***

### mirrorX

> **mirrorX**: `boolean`

Indicates if the captured frames will be mirrored horizontally

***

### playbackState

> **playbackState**: [`PlaybackState`](PlaybackState.md)

Capturing / playing / idle.

***

### selectedCamera?

> `optional` **selectedCamera**: [`Camera`](../classes/Camera.md)

The currently selected camera.

***

### videoElement?

> `optional` **videoElement**: `HTMLVideoElement`

The video element that will display the camera stream.
