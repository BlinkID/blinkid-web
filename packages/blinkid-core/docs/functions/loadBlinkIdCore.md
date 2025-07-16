[**@microblink/blinkid-core**](../README.md)

---

[@microblink/blinkid-core](../README.md) / loadBlinkIdCore

# Function: loadBlinkIdCore()

> **loadBlinkIdCore**(`settings`, `progressCallback?`): `Promise`\<\{ \}\>

Defined in: [packages/blinkid-core/src/BlinkIdCore.ts:44](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-core/src/BlinkIdCore.ts)

Creates and initializes a BlinkID core instance.

## Parameters

### settings

Configuration for BlinkID initialization including license key and resources location

### progressCallback?

`ProgressStatusCallback`

Optional callback for tracking resource download progress (WASM, data files)

## Returns

`Promise`\<\{ \}\>

Promise that resolves with initialized BlinkID core instance

## Throws

Error if initialization fails
