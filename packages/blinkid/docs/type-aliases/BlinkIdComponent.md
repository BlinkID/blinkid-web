[**@microblink/blinkid**](../README.md)

---

[@microblink/blinkid](../README.md) / BlinkIdComponent

# Type Alias: BlinkIdComponent

> **BlinkIdComponent** = `object`

Defined in: [packages/blinkid/src/createBlinkIdUi.ts:64](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/src/createBlinkIdUi.ts)

Represents the BlinkID component with all SDK instances and UI elements.

## Properties

### addOnErrorCallback

> **addOnErrorCallback**: `InstanceType`\<_typeof_ `BlinkIdUxManager`\>\[`"addOnErrorCallback"`\]

Defined in: [packages/blinkid/src/createBlinkIdUi.ts:86](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/src/createBlinkIdUi.ts)

Adds a callback function to be called when an error occurs.

---

### addOnResultCallback

> **addOnResultCallback**: `InstanceType`\<_typeof_ `BlinkIdUxManager`\>\[`"addOnResultCallback"`\]

Defined in: [packages/blinkid/src/createBlinkIdUi.ts:80](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/src/createBlinkIdUi.ts)

Adds a callback function to be called when a result is obtained.

---

### blinkIdCore

> **blinkIdCore**: `BlinkIdCore`

Defined in: [packages/blinkid/src/createBlinkIdUi.ts:66](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/src/createBlinkIdUi.ts)

The BlinkID Core SDK instance.

---

### blinkIdUxManager

> **blinkIdUxManager**: `BlinkIdUxManager`

Defined in: [packages/blinkid/src/createBlinkIdUi.ts:70](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/src/createBlinkIdUi.ts)

The BlinkID UX Manager instance.

---

### cameraManager

> **cameraManager**: `CameraManager`

Defined in: [packages/blinkid/src/createBlinkIdUi.ts:68](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/src/createBlinkIdUi.ts)

The Camera Manager instance.

---

### cameraUi

> **cameraUi**: `CameraManagerComponent`

Defined in: [packages/blinkid/src/createBlinkIdUi.ts:72](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/src/createBlinkIdUi.ts)

The Camera Manager UI instance.

---

### destroy()

> **destroy**: () => `Promise`\<`void`\>

Defined in: [packages/blinkid/src/createBlinkIdUi.ts:76](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/src/createBlinkIdUi.ts)

Destroys the BlinkID component and releases all resources.

#### Returns

`Promise`\<`void`\>
