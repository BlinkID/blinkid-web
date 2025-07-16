[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / DataMatchResult

# Type Alias: DataMatchResult

> **DataMatchResult** = `object`

Defined in: [result/DataMatchResult.ts:29](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/DataMatchResult.ts)

Represents the result of the data match algorithm.

## Properties

### overallState

> **overallState**: [`DataMatchState`](DataMatchState.md)

Defined in: [result/DataMatchResult.ts:33](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/DataMatchResult.ts)

The overall state of the data match.

***

### statePerField?

> `optional` **statePerField**: [`DataMatchFieldState`](DataMatchFieldState.md)[]

Defined in: [result/DataMatchResult.ts:31](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/DataMatchResult.ts)

Info on whether the data extracted from multiple sides matches
