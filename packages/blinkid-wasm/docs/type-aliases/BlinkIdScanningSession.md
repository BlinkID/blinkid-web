[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / BlinkIdScanningSession

# Type Alias: BlinkIdScanningSession

> **BlinkIdScanningSession** = `EmbindObject`\<\{ `getResult`: () => [`BlinkIdScanningResult`](BlinkIdScanningResult.md); `process`: (`image`) => [`BlinkIdProcessResult`](BlinkIdProcessResult.md) \| [`BlinkIdSessionError`](BlinkIdSessionError.md); `reset`: () => `void` \| [`BlinkIdSessionError`](BlinkIdSessionError.md); \}\>

Defined in: [session/BlinkIdScanningSession.ts:11](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningSession.ts)

Represents the scanning session for BlinkID
