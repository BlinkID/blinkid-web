[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / CameraManager

# Class: CameraManager

The CameraManager class.

## See

https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities for more details.

## Constructors

### Constructor

> **new CameraManager**(`options?`, `videoFrameProcessorOptions?`): `CameraManager`

Creates a new CameraManager instance.

#### Parameters

##### options?

`Partial`\<[`CameraManagerOptions`](../type-aliases/CameraManagerOptions.md)\>

The options for the CameraManager.

##### videoFrameProcessorOptions?

[`VideoFrameProcessorInitOptions`](../type-aliases/VideoFrameProcessorInitOptions.md)

The options for the VideoFrameProcessor.

#### Returns

`CameraManager`

## Properties

### getState()

> **getState**: () => [`CameraManagerStore`](../type-aliases/CameraManagerStore.md)

Gets the current internal state of the CameraManager.

#### Returns

[`CameraManagerStore`](../type-aliases/CameraManagerStore.md)

the current state of the CameraManager

***

### setResolution()

> **setResolution**: (`resolution`) => `Promise`\<`void`\>

Sets the desired video resolution for camera streams. This is used as the ideal resolution
when starting camera streams. If a camera doesn't support the specified resolution,
the camera will automatically fall back to the next lower supported resolution in this order:
4k → 1080p → 720p. If there's an active stream, it will be restarted with the new resolution.

#### Parameters

##### resolution

The ideal resolution to set for camera streams.

`"720p"` | `"1080p"` | `"4k"`

#### Returns

`Promise`\<`void`\>

***

### startFrameCapture()

> **startFrameCapture**: () => `Promise`\<`void`\>

Starts capturing frames from the video element.

#### Returns

`Promise`\<`void`\>

resolves when frame capture starts

***

### subscribe()

> **subscribe**: \{(`listener`): () => `void`; \<`U`\>(`selector`, `listener`, `options?`): () => `void`; \}

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

###### equalityFn?

(`a`, `b`) => `boolean`

###### fireImmediately?

`boolean`

##### Returns

> (): `void`

###### Returns

`void`

#### See

https://github.com/pmndrs/zustand#using-subscribe-with-selector for more details.

#### Returns

a cleanup function to remove the subscription

## Accessors

### extractionArea

#### Get Signature

> **get** **extractionArea**(): `undefined` \| [`ExtractionArea`](../type-aliases/ExtractionArea.md)

Gets the area of the video frame that will be extracted.

##### Returns

`undefined` \| [`ExtractionArea`](../type-aliases/ExtractionArea.md)

The area of the video frame that will be extracted.

***

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

True if there is a video playing or capturing

##### See

https://developer.mozilla.org/en-US/docs/Web/API/MediaSession/playbackState for more details.

##### Returns

`boolean`

***

### resolution

#### Get Signature

> **get** **resolution**(): `"720p"` \| `"1080p"` \| `"4k"`

The desired video resolution for camera streams. This is used as the ideal resolution
when starting camera streams. If a camera doesn't support the specified resolution,
the camera will automatically fall back to the next lower supported resolution in this order:
4k → 1080p → 720p. The actual resolution used may differ from this setting based on
camera capabilities and system constraints.

##### Returns

`"720p"` \| `"1080p"` \| `"4k"`

***

### selectedCamera

#### Get Signature

> **get** **selectedCamera**(): `undefined` \| [`Camera`](Camera.md)

##### Returns

`undefined` \| [`Camera`](Camera.md)

***

### userInitiatedAbort

#### Get Signature

> **get** **userInitiatedAbort**(): `boolean`

If true, the user has initiated an abort. This will prevent the
CameraManager from throwing errors when the user interrupts the process.

##### Returns

`boolean`

#### Set Signature

> **set** **userInitiatedAbort**(`value`): `void`

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### addFrameCaptureCallback()

> **addFrameCaptureCallback**(`frameCaptureCallback`): () => `boolean`

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

***

### getCameraDevices()

> **getCameraDevices**(): `Promise`\<[`Camera`](Camera.md)[]\>

Returns the cameras that are available to the user, filtered by the facing mode.
If no facing mode is set, all cameras are returned.

#### Returns

`Promise`\<[`Camera`](Camera.md)[]\>

The cameras that are available to the user, filtered by the facing mode.

***

### initVideoElement()

> **initVideoElement**(`videoElement`): `void`

Initializes the CameraManager with a video element.

#### Parameters

##### videoElement

`HTMLVideoElement`

The video element to initialize.

#### Returns

`void`

***

### pausePlayback()

> **pausePlayback**(): `void`

Pauses the video playback. This will also stop the capturing process.

#### Returns

`void`

***

### refreshCameraDevices()

> **refreshCameraDevices**(): `Promise`\<`void`\>

Refreshes available devices on the system and updates the state.

#### Returns

`Promise`\<`void`\>

resolves when the camera devices are refreshed

***

### releaseVideoElement()

> **releaseVideoElement**(): `void`

Cleans up the video element, and stops the stream.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Resets the CameraManager and stops all streams.

#### Returns

`void`

***

### selectCamera()

> **selectCamera**(`camera`): `Promise`\<`void`\>

Select a camera device from available ones.

#### Parameters

##### camera

[`Camera`](Camera.md)

The camera to select.

#### Returns

`Promise`\<`void`\>

***

### setCameraMirrorX()

> **setCameraMirrorX**(`mirrorX`): `void`

If true, the video and captured frames will be mirrored horizontally.

#### Parameters

##### mirrorX

`boolean`

If true, the video and captured frames will be mirrored horizontally.

#### Returns

`void`

***

### setExtractionArea()

> **setExtractionArea**(`extractionArea`): `void`

Sets the area of the video frame that will be extracted.

#### Parameters

##### extractionArea

[`ExtractionArea`](../type-aliases/ExtractionArea.md)

The area of the video frame that will be extracted.

#### Returns

`void`

***

### setFacingFilter()

> **setFacingFilter**(`facingFilter`): `void`

Sets the facing filter.

#### Parameters

##### facingFilter

[`FacingMode`](../type-aliases/FacingMode.md)[]

The facing filter.

#### Returns

`void`

***

### startCameraStream()

> **startCameraStream**(`params?`): `Promise`\<`void`\>

Starts a best-effort camera stream. Will pick a camera automatically if
none is selected.

#### Parameters

##### params?

[`StartCameraStreamOptions`](../type-aliases/StartCameraStreamOptions.md)

The parameters for the camera stream.

#### Returns

`Promise`\<`void`\>

resolves when the camera stream starts

***

### startPlayback()

> **startPlayback**(): `Promise`\<`void`\>

Starts the video playback

#### Returns

`Promise`\<`void`\>

resolves when playback starts

***

### stopFrameCapture()

> **stopFrameCapture**(): `void`

Pauses capturing frames, without stopping playback.

#### Returns

`void`

***

### stopStream()

> **stopStream**(): `void`

Stops the currently active stream. Also stops the video playback and capturing process.

#### Returns

`void`
