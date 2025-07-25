[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / CameraManagerComponent

# Type Alias: CameraManagerComponent

> **CameraManagerComponent** = `object`

The camera manager component.

## Properties

### addOnDismountCallback()

> **addOnDismountCallback**: (`fn`) => () => `void`

Sets a callback to be called when the component is unmounted.
Returns a cleanup function that removes the callback when called.

#### Parameters

##### fn

[`DismountCallback`](DismountCallback.md)

#### Returns

> (): `void`

##### Returns

`void`

***

### cameraManager

> **cameraManager**: [`CameraManager`](../classes/CameraManager.md)

The camera manager.

***

### dismount()

> **dismount**: () => `void`

Dismounts the component from the DOM and unloads the SDK

#### Returns

`void`

***

### feedbackLayerNode

> **feedbackLayerNode**: `HTMLDivElement`

The feedback layer node that can be used to append custom feedback elements

***

### overlayLayerNode

> **overlayLayerNode**: `HTMLDivElement`

The overlay layer node that can be used to append custom overlay elements

***

### owner

> **owner**: `Owner`

The owner of the component.

#### See

https://docs.solidjs.com/reference/reactive-utilities/get-owner

***

### updateLocalization

> **updateLocalization**: `SetStoreFunction`\<[`CameraUiLocalizationStrings`](CameraUiLocalizationStrings.md)\>

Updates the localization strings
