[**@microblink/feedback-stabilizer**](../README.md)

***

[@microblink/feedback-stabilizer](../README.md) / UiState

# Type Alias: UiState

> **UiState** = `object`

Represents a UI state configuration with timing and weight parameters.
Used to define how different UI states should behave in the stabilization process.

## Properties

### initialWeight?

> `optional` **initialWeight**: `number`

Initial weight for this state when it enters the stabilization queue.
Higher values give the state more influence in the averaging process.

***

### key

> **key**: `string`

Unique identifier for the UI state

***

### minDuration

> **minDuration**: `number`

Minimum duration (in milliseconds) this state should be displayed

***

### singleEmit?

> `optional` **singleEmit**: `boolean`

If true, the event will be emitted once the previous event is done.
It bypasses the averaging process and is handled separately.
