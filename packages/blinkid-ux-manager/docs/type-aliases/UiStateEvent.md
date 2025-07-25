[**@microblink/blinkid-ux-manager**](../README.md)

***

[@microblink/blinkid-ux-manager](../README.md) / UiStateEvent

# Type Alias: UiStateEvent

> **UiStateEvent** = `object`

Represents a UI state event in the stabilization queue.
These events are processed to determine which UI state should be displayed.

## Properties

### currentWeight

> **currentWeight**: `number`

Current weight of this event in the stabilization process

***

### key

> **key**: `string`

Identifier matching a UI state key

***

### singleEmit?

> `optional` **singleEmit**: `boolean`

If true, this event will be emitted once the previous event completes.
It bypasses the normal stabilization process.

***

### timeStamp

> **timeStamp**: `DOMHighResTimeStamp`

High-resolution timestamp when the event occurred
