[**@microblink/blinkid-ux-manager**](../README.md)

---

[@microblink/blinkid-ux-manager](../README.md) / BlinkIdUxManager

# Class: BlinkIdUxManager

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:30](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

The BlinkIdUxManager class. This is the main class that manages the UX of
the BlinkID SDK. It is responsible for handling the UI state, the timeout,
the help tooltip, and the document class filter.

## Constructors

### Constructor

> **new BlinkIdUxManager**(`cameraManager`, `scanningSession`): `BlinkIdUxManager`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:84](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

The constructor for the BlinkIdUxManager class.

#### Parameters

##### cameraManager

`CameraManager`

The camera manager.

##### scanningSession

`RemoteScanningSession`

The scanning session.

#### Returns

`BlinkIdUxManager`

## Properties

### cameraManager

> **cameraManager**: `CameraManager`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:32](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

The camera manager.

---

### feedbackStabilizer

> **feedbackStabilizer**: `FeedbackStabilizer`\<[`BlinkIdUiStateMap`](../type-aliases/BlinkIdUiStateMap.md)\>

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:44](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

The feedback stabilizer.

---

### rawUiStateKey

> **rawUiStateKey**: [`BlinkIdUiStateKey`](../type-aliases/BlinkIdUiStateKey.md)

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:42](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

The raw UI state key.

---

### scanningSession

> **scanningSession**: `RemoteScanningSession`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:34](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

The scanning session.

---

### sessionSettings

> **sessionSettings**: `BlinkIdSessionSettings`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:46](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

The session settings.

---

### showDemoOverlay

> **showDemoOverlay**: `boolean`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:36](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Whether the demo overlay should be shown.

---

### showProductionOverlay

> **showProductionOverlay**: `boolean`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:38](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Whether the production overlay should be shown.

---

### uiState

> **uiState**: [`BlinkIdUiState`](../type-aliases/BlinkIdUiState.md)

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:40](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

The current UI state.

## Methods

### addDocumentClassFilter()

> **addDocumentClassFilter**(`callback`): () => `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:242](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Registers a callback function to filter document classes.

#### Parameters

##### callback

[`DocumentClassFilter`](../type-aliases/DocumentClassFilter.md)

A function that will be called with the document class
info.

#### Returns

A cleanup function that, when called, will remove the registered
callback.

> (): `void`

##### Returns

`void`

#### Example

```ts
const cleanup = manager.addDocumentClassFilter((docClassInfo) => {
  return docClassInfo.country === "usa";
});

// Later, to remove the callback:
cleanup();
```

---

### addOnDocumentFilteredCallback()

> **addOnDocumentFilteredCallback**(`callback`): () => `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:328](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Registers a callback function to be called when a document is filtered.

#### Parameters

##### callback

(`documentClassInfo`) => `void`

A function that will be called with the document class
info.

#### Returns

A cleanup function that, when called, will remove the registered
callback.

> (): `void`

##### Returns

`void`

#### Example

```ts
const cleanup = manager.addOnDocumentFilteredCallback((docClassInfo) => {
  console.log("Document filtered:", docClassInfo);
});

// Later, to remove the callback:
cleanup();
```

---

### addOnErrorCallback()

> **addOnErrorCallback**(`callback`): () => `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:290](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Registers a callback function to be called when an error occurs during
processing.

#### Parameters

##### callback

(`errorState`) => `void`

A function that will be called with the error state.

#### Returns

A cleanup function that, when called, will remove the registered
callback.

> (): `void`

##### Returns

`void`

#### Example

```ts
const cleanup = manager.addOnErrorCallback((error) => {
  console.error("Processing error:", error);
});

// Later, to remove the callback:
cleanup();
```

---

### addOnFrameProcessCallback()

> **addOnFrameProcessCallback**(`callback`): () => `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:265](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Registers a callback function to be called when a frame is processed.

#### Parameters

##### callback

(`frameResult`) => `void`

A function that will be called with the frame analysis
result.

#### Returns

A cleanup function that, when called, will remove the registered
callback.

> (): `void`

##### Returns

`void`

#### Example

```ts
const cleanup = manager.addOnFrameProcessCallback((frameResult) => {
  console.log("Frame processed:", frameResult);
});

// Later, to remove the callback:
cleanup();
```

---

### addOnResultCallback()

> **addOnResultCallback**(`callback`): () => `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:219](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Registers a callback function to be called when a scan result is available.

#### Parameters

##### callback

(`result`) => `void`

A function that will be called with the scan result.

#### Returns

A cleanup function that, when called, will remove the registered
callback.

> (): `void`

##### Returns

`void`

#### Example

```ts
const cleanup = manager.addOnResultCallback((result) => {
  console.log("Scan result:", result);
});

// Later, to remove the callback:
cleanup();
```

---

### addOnUiStateChangedCallback()

> **addOnUiStateChangedCallback**(`callback`): () => `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:196](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Adds a callback function to be executed when the UI state changes.

#### Parameters

##### callback

(`uiState`) => `void`

Function to be called when UI state changes. Receives the
new UI state as parameter.

#### Returns

A cleanup function that removes the callback when called.

> (): `void`

##### Returns

`void`

#### Example

```ts
const cleanup = manager.addOnUiStateChangedCallback((newState) => {
  console.log("UI state changed to:", newState);
});

cleanup();
```

---

### clearScanTimeout()

> **clearScanTimeout**(): `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:653](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Clears the scanning session timeout.

#### Returns

`void`

---

### getHelpTooltipHideDelay()

> **getHelpTooltipHideDelay**(): `null` \| `number`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:178](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Returns the time in ms before the help tooltip is hidden. Null if tooltip won't be auto hidden.

#### Returns

`null` \| `number`

---

### getHelpTooltipShowDelay()

> **getHelpTooltipShowDelay**(): `null` \| `number`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:171](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Returns the time in ms before the help tooltip is shown. Null if tooltip won't be auto shown.

#### Returns

`null` \| `number`

---

### getShowDemoOverlay()

> **getShowDemoOverlay**(): `boolean`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:149](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Indicates whether the UI should display the demo overlay. Controlled by the
license property.

#### Returns

`boolean`

---

### getShowProductionOverlay()

> **getShowProductionOverlay**(): `boolean`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:157](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Indicates whether the UI should display the production overlay. Controlled by
the license property.

#### Returns

`boolean`

---

### getTimeoutDuration()

> **getTimeoutDuration**(): `null` \| `number`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:164](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Returns the timeout duration in ms. Null if timeout won't be triggered ever.

#### Returns

`null` \| `number`

---

### reset()

> **reset**(): `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:668](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Resets the BlinkIdUxManager.

Does not reset the camera manager or the scanning session.

#### Returns

`void`

---

### setHelpTooltipHideDelay()

> **setHelpTooltipHideDelay**(`duration`): `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:514](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Sets the duration in milliseconds before the help tooltip is hidden.
A value of null means the help tooltip will not be auto hidden.

#### Parameters

##### duration

The duration in milliseconds before the help tooltip is
hidden. If null, tooltip won't be auto hidden.

`null` | `number`

#### Returns

`void`

#### Throws

Throws an error if duration is less than or equal to 0 when
not null.

---

### setHelpTooltipShowDelay()

> **setHelpTooltipShowDelay**(`duration`): `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:497](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Sets the duration in milliseconds before the help tooltip is shown.
A value of null means the help tooltip will not be auto shown.

#### Parameters

##### duration

The duration in milliseconds before the help tooltip is
shown. If null, tooltip won't be auto shown.

`null` | `number`

#### Returns

`void`

#### Throws

Throws an error if duration is less than or equal to 0 when
not null.

---

### setTimeoutDuration()

> **setTimeoutDuration**(`duration`, `setHelpTooltipShowDelay`): `void`

Defined in: [blinkid-ux-manager/src/core/BlinkIdUxManager.ts:476](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/core/BlinkIdUxManager.ts)

Sets the duration after which the scanning session will timeout. The
timeout can occur in various scenarios and may be restarted by different
scanning events.

#### Parameters

##### duration

The timeout duration in milliseconds. If null, timeout won't
be triggered ever.

`null` | `number`

##### setHelpTooltipShowDelay

`boolean` = `true`

If true, also sets the help tooltip show
delay to half of the provided duration. If timeout duration is null, help
tooltip show delay will be set to null. Defaults to true.

#### Returns

`void`

#### Throws

Throws an error if duration is less than or equal to 0 when not null.
