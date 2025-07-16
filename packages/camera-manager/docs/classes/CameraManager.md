[**@microblink/camera-manager**](../README.md)

---

[@microblink/camera-manager](../README.md) / CameraManager

# Class: CameraManager

Defined in: [packages/camera-manager/src/core/CameraManager.ts:111](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

The CameraManager class.

## See

https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities for more details.

## Constructors

### Constructor

> **new CameraManager**(`options`, `videoFrameProcessorOptions?`): `CameraManager`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:163](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Creates a new CameraManager instance.

#### Parameters

##### options

`Partial`\<[`CameraManagerOptions`](../type-aliases/CameraManagerOptions.md)\> = `{}`

The options for the CameraManager.

##### videoFrameProcessorOptions?

[`VideoFrameProcessorInitOptions`](../type-aliases/VideoFrameProcessorInitOptions.md)

The options for the VideoFrameProcessor.

#### Returns

`CameraManager`

## Properties

### getState()

> **getState**: () => [`CameraManagerStore`](../type-aliases/CameraManagerStore.md) = `store.getState`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:985](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Gets the current internal state of the CameraManager.

#### Returns

[`CameraManagerStore`](../type-aliases/CameraManagerStore.md)

the current state of the CameraManager

---

### subscribe()

> **subscribe**: \{(`listener`): () => `void`; \<`U`\>(`selector`, `listener`, `options?`): () => `void`; \} = `store.subscribe`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:978](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Allows the user to subscribe to state changes inside the Camera Manager.
Implemented using Zustand. For usage information, see

#### Call Signature

> (`listener`): () => `void`

##### Parameters

###### listener

(`selectedState`, `previousSelectedState`) => `void`

##### Returns

> (): `void`

###### Returns

`void`

#### Call Signature

> \<`U`\>(`selector`, `listener`, `options?`): () => `void`

##### Type Parameters

###### U

`U`

##### Parameters

###### selector

(`state`) => `U`

###### listener

(`selectedState`, `previousSelectedState`) => `void`

###### options?

##### Returns

> (): `void`

###### Returns

`void`

#### See

https://github.com/pmndrs/zustand#using-subscribe-with-selector for more details.

#### Returns

a cleanup function to remove the subscription

## Accessors

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:207](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

True if there is a video playing or capturing

##### See

https://developer.mozilla.org/en-US/docs/Web/API/MediaSession/playbackState for more details.

##### Returns

`boolean`

---

### resolution

#### Get Signature

> **get** **resolution**(): `"720p"` \| `"1080p"` \| `"4k"`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:198](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

The resolution of the camera stream.

##### Returns

`"720p"` \| `"1080p"` \| `"4k"`

---

### userInitiatedAbort

#### Get Signature

> **get** **userInitiatedAbort**(): `boolean`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:134](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

If true, the user has initiated an abort. This will prevent the
CameraManager from throwing errors when the user interrupts the process.

##### Returns

`boolean`

#### Set Signature

> **set** **userInitiatedAbort**(`value`): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:138](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### addFrameCaptureCallback()

> **addFrameCaptureCallback**(`frameCaptureCallback`): () => `boolean`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:373](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Adds a callback that will be triggered on each frame when the playback state
is "capturing".

#### Parameters

##### frameCaptureCallback

[`FrameCaptureCallback`](../type-aliases/FrameCaptureCallback.md)

The callback to add.

#### Returns

a cleanup function to remove the callback

> (): `boolean`

##### Returns

`boolean`

---

### getCameraDevices()

> **getCameraDevices**(): `Promise`\<[`Camera`](Camera.md)[]\>

Defined in: [packages/camera-manager/src/core/CameraManager.ts:229](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Returns the cameras that are available to the user, filtered by the facing mode.
If no facing mode is set, all cameras are returned.

#### Returns

`Promise`\<[`Camera`](Camera.md)[]\>

The cameras that are available to the user, filtered by the facing mode.

---

### initVideoElement()

> **initVideoElement**(`videoElement`): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:354](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Initializes the CameraManager with a video element.

#### Parameters

##### videoElement

`HTMLVideoElement`

The video element to initialize.

#### Returns

`void`

---

### pausePlayback()

> **pausePlayback**(): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:810](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Pauses the video playback. This will also stop the capturing process.

#### Returns

`void`

---

### refreshCameraDevices()

> **refreshCameraDevices**(): `Promise`\<`void`\>

Defined in: [packages/camera-manager/src/core/CameraManager.ts:458](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Refreshes available devices on the system and updates the state.

#### Returns

`Promise`\<`void`\>

resolves when the camera devices are refreshed

---

### releaseVideoElement()

> **releaseVideoElement**(): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:381](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Cleans up the video element, and stops the stream.

#### Returns

`void`

---

### reset()

> **reset**(): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:990](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Resets the CameraManager and stops all streams.

#### Returns

`void`

---

### selectCamera()

> **selectCamera**(`camera`): `Promise`\<`void`\>

Defined in: [packages/camera-manager/src/core/CameraManager.ts:395](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Select a camera device from available ones.

#### Parameters

##### camera

[`Camera`](Camera.md)

The camera to select.

#### Returns

`Promise`\<`void`\>

---

### setCameraMirrorX()

> **setCameraMirrorX**(`mirrorX`): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:946](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

If true, the video and captured frames will be mirrored horizontally.

#### Parameters

##### mirrorX

`boolean`

If true, the video and captured frames will be mirrored horizontally.

#### Returns

`void`

---

### setExtractionArea()

> **setExtractionArea**(`extractionArea`): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:147](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Sets the area of the video frame that will be extracted.

#### Parameters

##### extractionArea

[`ExtractionArea`](../type-aliases/ExtractionArea.md)

The area of the video frame that will be extracted.

#### Returns

`void`

---

### setFacingFilter()

> **setFacingFilter**(`facingFilter`): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:217](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Sets the facing filter.

#### Parameters

##### facingFilter

[`FacingMode`](../type-aliases/FacingMode.md)[]

The facing filter.

#### Returns

`void`

---

### setResolution()

> **setResolution**(`resolution`): `Promise`\<`void`\>

Defined in: [packages/camera-manager/src/core/CameraManager.ts:183](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Sets the resolution of the camera stream.

#### Parameters

##### resolution

The resolution to set.

`"720p"` | `"1080p"` | `"4k"`

#### Returns

`Promise`\<`void`\>

---

### startCameraStream()

> **startCameraStream**(`params`): `Promise`\<`void`\>

Defined in: [packages/camera-manager/src/core/CameraManager.ts:757](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Starts a best-effort camera stream. Will pick a camera automatically if
none is selected.

#### Parameters

##### params

[`StartCameraStreamOptions`](../type-aliases/StartCameraStreamOptions.md) = `{}`

The parameters for the camera stream.

#### Returns

`Promise`\<`void`\>

resolves when the camera stream starts

---

### startFrameCapture()

> **startFrameCapture**(): `Promise`\<`void`\>

Defined in: [packages/camera-manager/src/core/CameraManager.ts:626](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Starts capturing frames from the video element.

#### Returns

`Promise`\<`void`\>

resolves when frame capture starts

---

### startPlayback()

> **startPlayback**(): `Promise`\<`void`\>

Defined in: [packages/camera-manager/src/core/CameraManager.ts:534](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Starts the video playback

#### Returns

`Promise`\<`void`\>

resolves when playback starts

---

### stopFrameCapture()

> **stopFrameCapture**(): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:786](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Pauses capturing frames, without stopping playback.

#### Returns

`void`

---

### stopStream()

> **stopStream**(): `void`

Defined in: [packages/camera-manager/src/core/CameraManager.ts:795](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

Stops the currently active stream. Also stops the video playback and capturing process.

#### Returns

`void`
