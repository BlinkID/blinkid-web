[**@microblink/feedback-stabilizer**](../README.md)

***

[@microblink/feedback-stabilizer](../README.md) / UiStateEvent

# Type Alias: UiStateEvent

> **UiStateEvent** = `object`

Defined in: [index.ts:36](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Represents a UI state event in the stabilization queue.
These events are processed to determine which UI state should be displayed.

## Properties

### currentWeight

> **currentWeight**: `number`

Defined in: [index.ts:44](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Current weight of this event in the stabilization process

***

### key

> **key**: `string`

Defined in: [index.ts:38](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Identifier matching a UI state key

***

### singleEmit?

> `optional` **singleEmit**: `boolean`

Defined in: [index.ts:50](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

If true, this event will be emitted once the previous event completes.
It bypasses the normal stabilization process.

***

### timeStamp

> **timeStamp**: `DOMHighResTimeStamp`

Defined in: [index.ts:41](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

High-resolution timestamp when the event occurred
