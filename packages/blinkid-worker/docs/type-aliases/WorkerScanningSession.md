[**@microblink/blinkid-worker**](../README.md)

***

[@microblink/blinkid-worker](../README.md) / WorkerScanningSession

# Type Alias: WorkerScanningSession

> **WorkerScanningSession** = `OverrideProperties`\<`BlinkIdScanningSession`, \{ `process`: (`image`) => [`ProcessResultWithBuffer`](ProcessResultWithBuffer.md); \}\> & `object`

The worker scanning session.

## Type declaration

### getSettings()

> **getSettings**: () => `BlinkIdSessionSettings`

Gets the settings.

#### Returns

`BlinkIdSessionSettings`

The settings.

### showDemoOverlay()

> **showDemoOverlay**: () => `boolean`

Shows the demo overlay.

#### Returns

`boolean`

Whether the demo overlay is shown.

### showProductionOverlay()

> **showProductionOverlay**: () => `boolean`

Shows the production overlay.

#### Returns

`boolean`

Whether the production overlay is shown.
