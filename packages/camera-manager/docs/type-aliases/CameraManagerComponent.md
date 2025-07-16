[**@microblink/camera-manager**](../README.md)

---

[@microblink/camera-manager](../README.md) / CameraManagerComponent

# Type Alias: CameraManagerComponent

> **CameraManagerComponent** = `object`

Defined in: [packages/camera-manager/src/ui/createCameraManagerUi.tsx:29](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/ui/createCameraManagerUi.tsx)

The camera manager component.

## Properties

### addOnDismountCallback()

> **addOnDismountCallback**: (`fn`) => () => `void`

Defined in: [packages/camera-manager/src/ui/createCameraManagerUi.tsx:40](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/ui/createCameraManagerUi.tsx)

Sets a callback to be called when the component is unmounted.
Returns a cleanup function that removes the callback when called.

#### Parameters

##### fn

[`DismountCallback`](DismountCallback.md)

#### Returns

> (): `void`

##### Returns

`void`

---

### cameraManager

> **cameraManager**: [`CameraManager`](../classes/CameraManager.md)

Defined in: [packages/camera-manager/src/ui/createCameraManagerUi.tsx:31](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/ui/createCameraManagerUi.tsx)

The camera manager.

---

### dismount()

> **dismount**: () => `void`

Defined in: [packages/camera-manager/src/ui/createCameraManagerUi.tsx:35](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/ui/createCameraManagerUi.tsx)

Dismounts the component from the DOM and unloads the SDK

#### Returns

`void`

---

### feedbackLayerNode

> **feedbackLayerNode**: `HTMLDivElement`

Defined in: [packages/camera-manager/src/ui/createCameraManagerUi.tsx:44](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/ui/createCameraManagerUi.tsx)

The feedback layer node that can be used to append custom feedback elements

---

### overlayLayerNode

> **overlayLayerNode**: `HTMLDivElement`

Defined in: [packages/camera-manager/src/ui/createCameraManagerUi.tsx:48](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/ui/createCameraManagerUi.tsx)

The overlay layer node that can be used to append custom overlay elements

---

### owner

> **owner**: `Owner`

Defined in: [packages/camera-manager/src/ui/createCameraManagerUi.tsx:55](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/ui/createCameraManagerUi.tsx)

The owner of the component.

#### See

https://docs.solidjs.com/reference/reactive-utilities/get-owner

---

### updateLocalization

> **updateLocalization**: `SetStoreFunction`\<[`CameraUiLocalizationStrings`](CameraUiLocalizationStrings.md)\>

Defined in: [packages/camera-manager/src/ui/createCameraManagerUi.tsx:33](https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/src/ui/createCameraManagerUi.tsx)

Updates the localization strings
