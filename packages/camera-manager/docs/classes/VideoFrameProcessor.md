[**@microblink/camera-manager**](../README.md)

***

[@microblink/camera-manager](../README.md) / VideoFrameProcessor

# Class: VideoFrameProcessor

VideoFrameProcessor captures frames from video or image sources using either 2D or WebGL2 rendering

## Constructors

### Constructor

> **new VideoFrameProcessor**(`options`): `VideoFrameProcessor`

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

Clean up resources.

#### Returns

`void`

***

### getCurrentImageData()

> **getCurrentImageData**(): `ImageData`

Used to get the current ImageData object with the current buffer. Useful
when you need to get the same `ImageData` object multiple times after the
original `ImageData` buffer has been detached

#### Returns

`ImageData`

ImageData object with the current buffer

***

### getImageData()

> **getImageData**(`source`, `area?`): `ImageData`

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

***

### isBufferDetached()

> **isBufferDetached**(): `boolean`

Used to check if the processor owns the buffer.

#### Returns

`boolean`

true if the processor owns the buffer, false otherwise.

***

### reattachArrayBuffer()

> **reattachArrayBuffer**(`arrayBuffer`): `void`

Returns ownership of an ArrayBuffer to the processor for reuse.

This should only be called with ArrayBuffers that were originally from this processor.
Typically used after transferring the buffer to/from a worker.

#### Parameters

##### arrayBuffer

`ArrayBufferLike`

The array buffer to reattach.

#### Returns

`void`
