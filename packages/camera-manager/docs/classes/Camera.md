[**@microblink/camera-manager**](../README.md)

---

[@microblink/camera-manager](../README.md) / Camera

# Class: Camera

Defined in: [packages/camera-manager/src/core/Camera.ts:136](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

Represents a camera device and its active stream.

## See

https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities for more details.

## Constructors

### Constructor

> **new Camera**(`deviceInfo`): `Camera`

Defined in: [packages/camera-manager/src/core/Camera.ts:183](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

Creates a new Camera instance.

#### Parameters

##### deviceInfo

`InputDeviceInfo`

The device info.

#### Returns

`Camera`

## Properties

### activeStream

> **activeStream**: `undefined` \| `MediaStream`

Defined in: [packages/camera-manager/src/core/Camera.ts:151](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

---

### deviceInfo

> **deviceInfo**: `InputDeviceInfo`

Defined in: [packages/camera-manager/src/core/Camera.ts:140](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

The device info.

---

### facingMode

> **facingMode**: [`FacingMode`](../type-aliases/FacingMode.md)

Defined in: [packages/camera-manager/src/core/Camera.ts:153](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

---

### maxSupportedResolution?

> `optional` **maxSupportedResolution**: `"720p"` \| `"1080p"` \| `"4k"`

Defined in: [packages/camera-manager/src/core/Camera.ts:157](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

---

### name

> **name**: `string`

Defined in: [packages/camera-manager/src/core/Camera.ts:152](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

---

### notify()

> **notify**: (`reason?`) => `void`

Defined in: [packages/camera-manager/src/core/Camera.ts:164](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

#### Parameters

##### reason?

`unknown`

#### Returns

`void`

---

### notifyStateChange()?

> `optional` **notifyStateChange**: (`camera`, `reason?`) => `void`

Defined in: [packages/camera-manager/src/core/Camera.ts:165](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

#### Parameters

##### camera

`Camera`

##### reason?

`unknown`

#### Returns

`void`

---

### original

> **original**: `Camera`

Defined in: [packages/camera-manager/src/core/Camera.ts:162](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

Reference to the original instance before it was proxied.

---

### singleShotSupported

> **singleShotSupported**: `boolean` = `false`

Defined in: [packages/camera-manager/src/core/Camera.ts:156](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

---

### streamCapabilities?

> `optional` **streamCapabilities**: `MediaTrackCapabilities`

Defined in: [packages/camera-manager/src/core/Camera.ts:150](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

Stream capabilities as reported by the stream.

On iOS it's the same as `deviceCapabilities`. Firefox is only reporting
rudimentary capabilities, so we can't rely on this for picking the right
camera.

#### See

https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities

---

### torchEnabled

> **torchEnabled**: `boolean` = `false`

Defined in: [packages/camera-manager/src/core/Camera.ts:155](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

---

### torchSupported

> **torchSupported**: `boolean` = `false`

Defined in: [packages/camera-manager/src/core/Camera.ts:154](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

## Methods

### getVideoTrack()

> **getVideoTrack**(): `undefined` \| `MediaStreamTrack`

Defined in: [packages/camera-manager/src/core/Camera.ts:434](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

Gets the video track on the camera.

#### Returns

`undefined` \| `MediaStreamTrack`

The video track.

---

### startStream()

> **startStream**(`resolution`): `Promise`\<`MediaStream`\>

Defined in: [packages/camera-manager/src/core/Camera.ts:240](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

Starts a stream with the specified resolution.

#### Parameters

##### resolution

The resolution to start the stream with.

`"720p"` | `"1080p"` | `"4k"`

#### Returns

`Promise`\<`MediaStream`\>

The stream.

---

### stopStream()

> **stopStream**(): `void`

Defined in: [packages/camera-manager/src/core/Camera.ts:419](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

Stops the stream on the camera.

#### Returns

`void`

---

### toggleTorch()

> **toggleTorch**(): `Promise`\<`boolean`\>

Defined in: [packages/camera-manager/src/core/Camera.ts:385](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/core/Camera.ts)

Toggles the torch on the camera.

#### Returns

`Promise`\<`boolean`\>

The torch status.
