[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / BlinkIdScanningSession

# Type Alias: BlinkIdScanningSession

> **BlinkIdScanningSession** = `EmbindObject`\<\{ `getResult`: () => [`BlinkIdScanningResult`](BlinkIdScanningResult.md); `process`: (`image`) => [`BlinkIdProcessResult`](BlinkIdProcessResult.md) \| [`BlinkIdSessionError`](BlinkIdSessionError.md); `reset`: () => `void` \| [`BlinkIdSessionError`](BlinkIdSessionError.md); \}\>

Represents the scanning session for BlinkID
