[**@microblink/camera-manager**](../README.md)

---

[@microblink/camera-manager](../README.md) / VideoFrameProcessor

# Class: VideoFrameProcessor

Defined in: [packages/camera-manager/src/core/VideoFrameProcessor.ts:51](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/VideoFrameProcessor.ts)

VideoFrameProcessor captures frames from video or image sources using either 2D or WebGL2 rendering

## Constructors

### Constructor

> **new VideoFrameProcessor**(`options`): `VideoFrameProcessor`

Defined in: [packages/camera-manager/src/core/VideoFrameProcessor.ts:68](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/VideoFrameProcessor.ts)

Creates a new VideoFrameProcessor.

#### Parameters

##### options

[`VideoFrameProcessorInitOptions`](../type-aliases/VideoFrameProcessorInitOptions.md) = `{}`

The options for the VideoFrameProcessor.

#### Returns

`VideoFrameProcessor`

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [packages/camera-manager/src/core/VideoFrameProcessor.ts:353](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/VideoFrameProcessor.ts)

Clean up resources.

#### Returns

`void`

---

### getCurrentImageData()

> **getCurrentImageData**(): `ImageData`

Defined in: [packages/camera-manager/src/core/VideoFrameProcessor.ts:217](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/VideoFrameProcessor.ts)

Used to get the current ImageData object with the current buffer. Useful
when you need to get the same `ImageData` object multiple times after the
original `ImageData` buffer has been detached

#### Returns

`ImageData`

ImageData object with the current buffer

---

### getImageData()

> **getImageData**(`source`, `area?`): `ImageData`

Defined in: [packages/camera-manager/src/core/VideoFrameProcessor.ts:204](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/VideoFrameProcessor.ts)

Extracts image data from a source element.

#### Parameters

##### source

[`ImageSource`](../type-aliases/ImageSource.md)

The source element to extract image data from.

##### area?

[`ExtractionArea`](../type-aliases/ExtractionArea.md)

The extraction area.

#### Returns

`ImageData`

The image data.

---

### isBufferDetached()

> **isBufferDetached**(): `boolean`

Defined in: [packages/camera-manager/src/core/VideoFrameProcessor.ts:190](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/VideoFrameProcessor.ts)

Used to check if the processor owns the buffer.

#### Returns

`boolean`

true if the processor owns the buffer, false otherwise.

---

### reattachArrayBuffer()

> **reattachArrayBuffer**(`arrayBuffer`): `void`

Defined in: [packages/camera-manager/src/core/VideoFrameProcessor.ts:165](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/VideoFrameProcessor.ts)

Returns ownership of an ArrayBuffer to the processor for reuse.

This should only be called with ArrayBuffers that were originally from this processor.
Typically used after transferring the buffer to/from a worker.

#### Parameters

##### arrayBuffer

`ArrayBufferLike`

The array buffer to reattach.

#### Returns

`void`
