[**@microblink/feedback-stabilizer**](../README.md)

***

[@microblink/feedback-stabilizer](../README.md) / UiState

# Type Alias: UiState

> **UiState** = `object`

Defined in: [index.ts:12](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Represents a UI state configuration with timing and weight parameters.
Used to define how different UI states should behave in the stabilization process.

## Properties

### initialWeight?

> `optional` **initialWeight**: `number`

Defined in: [index.ts:29](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Initial weight for this state when it enters the stabilization queue.
Higher values give the state more influence in the averaging process.

***

### key

> **key**: `string`

Defined in: [index.ts:14](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Unique identifier for the UI state

***

### minDuration

> **minDuration**: `number`

Defined in: [index.ts:17](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Minimum duration (in milliseconds) this state should be displayed

***

### singleEmit?

> `optional` **singleEmit**: `boolean`

Defined in: [index.ts:23](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

If true, the event will be emitted once the previous event is done.
It bypasses the averaging process and is handled separately.
