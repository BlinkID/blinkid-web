[**@microblink/camera-manager**](../README.md)

***

[@microblink/camera-manager](../README.md) / Camera

# Class: Camera

Represents a camera device and its active stream.

## See

https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities for more details.

## Constructors

### Constructor

> **new Camera**(`deviceInfo`): `Camera`

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

***

### deviceInfo

> **deviceInfo**: `InputDeviceInfo`

The device info.

***

### facingMode

> **facingMode**: [`FacingMode`](../type-aliases/FacingMode.md)

***

### maxSupportedResolution?

> `optional` **maxSupportedResolution**: `"720p"` \| `"1080p"` \| `"4k"`

***

### name

> **name**: `string`

***

### notify()

> **notify**: (`reason?`) => `void`

#### Parameters

##### reason?

`unknown`

#### Returns

`void`

***

### notifyStateChange()?

> `optional` **notifyStateChange**: (`camera`, `reason?`) => `void`

#### Parameters

##### camera

`Camera`

##### reason?

`unknown`

#### Returns

`void`

***

### original

> **original**: `Camera`

Reference to the original instance before it was proxied.

***

### singleShotSupported

> **singleShotSupported**: `boolean` = `false`

***

### streamCapabilities?

> `optional` **streamCapabilities**: `MediaTrackCapabilities`

Stream capabilities as reported by the stream.

On iOS it's the same as `deviceCapabilities`. Firefox is only reporting
rudimentary capabilities, so we can't rely on this for picking the right
camera.

#### See

https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities

***

### torchEnabled

> **torchEnabled**: `boolean` = `false`

***

### torchSupported

> **torchSupported**: `boolean` = `false`

## Methods

### getVideoTrack()

> **getVideoTrack**(): `undefined` \| `MediaStreamTrack`

Gets the video track on the camera.

#### Returns

`undefined` \| `MediaStreamTrack`

The video track.

***

### startStream()

> **startStream**(`resolution`): `Promise`\<`MediaStream`\>

Starts a stream with the specified resolution.

#### Parameters

##### resolution

The resolution to start the stream with.

`"720p"` | `"1080p"` | `"4k"`

#### Returns

`Promise`\<`MediaStream`\>

The stream.

***

### stopStream()

> **stopStream**(): `void`

Stops the stream on the camera.

#### Returns

`void`

***

### toggleTorch()

> **toggleTorch**(): `Promise`\<`boolean`\>

Toggles the torch on the camera.

#### Returns

`Promise`\<`boolean`\>

The torch status.
