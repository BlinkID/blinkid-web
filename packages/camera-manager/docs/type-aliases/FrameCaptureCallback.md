[**@microblink/camera-manager**](../README.md)

---

[@microblink/camera-manager](../README.md) / FrameCaptureCallback

# Type Alias: FrameCaptureCallback()

> **FrameCaptureCallback** = (`frame`) => `Promisable`\<`ArrayBufferLike` \| `void`\>

Defined in: [packages/camera-manager/src/core/CameraManager.ts:39](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/CameraManager.ts)

A callback that will be triggered on each frame when the playback state is
"capturing".

## Parameters

### frame

`ImageData`

The frame to capture.

## Returns

`Promisable`\<`ArrayBufferLike` \| `void`\>

The frame.
