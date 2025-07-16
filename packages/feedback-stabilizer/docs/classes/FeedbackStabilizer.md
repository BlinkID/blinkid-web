[**@microblink/feedback-stabilizer**](../README.md)

***

[@microblink/feedback-stabilizer](../README.md) / FeedbackStabilizer

# Class: FeedbackStabilizer\<SdkSpecificStateMap\>

Defined in: [index.ts:69](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

FeedbackStabilizer provides UI state management with temporal smoothing.

It helps prevent UI "flickering" by:
- Maintaining a time-windowed history of UI state changes
- Applying weighted averaging to determine the most appropriate state
- Supporting immediate state changes through single-emit events
- Enforcing minimum display durations for states

## Type Parameters

### SdkSpecificStateMap

`SdkSpecificStateMap` *extends* [`UiStateMap`](../type-aliases/UiStateMap.md)

Type extending UiStateMap for SDK-specific states

## Constructors

### Constructor

> **new FeedbackStabilizer**\<`SdkSpecificStateMap`\>(`uiStateMap`, `initialKey`, `timeWindow?`, `decayRate?`): `FeedbackStabilizer`\<`SdkSpecificStateMap`\>

Defined in: [index.ts:145](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Creates a new FeedbackStabilizer instance.

#### Parameters

##### uiStateMap

`SdkSpecificStateMap`

Map of all possible UI states and their configurations

##### initialKey

\`$\{Extract\<keyof SdkSpecificStateMap, string \| number\>\}\`

Key of the initial UI state to display

##### timeWindow?

`number`

Optional custom time window (in ms) for state averaging

##### decayRate?

`number`

Optional custom decay rate for event weights

#### Returns

`FeedbackStabilizer`\<`SdkSpecificStateMap`\>

## Accessors

### currentState

#### Get Signature

> **get** **currentState**(): `SdkSpecificStateMap`\[\`$\{Extract\<keyof SdkSpecificStateMap, string \| number\>\}\`\]

Defined in: [index.ts:97](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Gets the currently active UI state configuration.

##### Returns

`SdkSpecificStateMap`\[\`$\{Extract\<keyof SdkSpecificStateMap, string \| number\>\}\`\]

The currently active UI state configuration.

## Methods

### canShowNewUiState()

> **canShowNewUiState**(): `boolean`

Defined in: [index.ts:182](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Checks if enough time has passed to show a new UI state

#### Returns

`boolean`

true if the current state's minimum duration has elapsed

***

### getEventQueue()

> **getEventQueue**(): [`UiStateEvent`](../type-aliases/UiStateEvent.md)[]

Defined in: [index.ts:106](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Gets a copy of the current event queue for debugging.

#### Returns

[`UiStateEvent`](../type-aliases/UiStateEvent.md)[]

A copy of the current event queue.

***

### getNewUiState()

> **getNewUiState**(`incomingUiStateKey`): `SdkSpecificStateMap`\[\`$\{Extract\<keyof SdkSpecificStateMap, string \| number\>\}\`\]

Defined in: [index.ts:200](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Processes a new UI state event and determines the state to display.

This method:
1. Handles single-emit events that bypass normal stabilization
2. Maintains a time-windowed queue of regular events
3. Applies temporal averaging with decay to determine the winning state

#### Parameters

##### incomingUiStateKey

\`$\{Extract\<keyof SdkSpecificStateMap, string \| number\>\}\`

Key of the new UI state event

#### Returns

`SdkSpecificStateMap`\[\`$\{Extract\<keyof SdkSpecificStateMap, string \| number\>\}\`\]

The UI state that should be displayed.

***

### getScoreBoard()

> **getScoreBoard**(): `Record`\<`string`, `number`[]\>

Defined in: [index.ts:124](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Gets the score history for each state.

#### Returns

`Record`\<`string`, `number`[]\>

The score history for each state.

***

### getScores()

> **getScores**(): `Record`\<`string`, `number`\>

Defined in: [index.ts:115](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Gets the current summed scores for each state.

#### Returns

`Record`\<`string`, `number`\>

The current summed scores for each state.

***

### reset()

> **reset**(): `void`

Defined in: [index.ts:170](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Resets the stabilizer to its initial state.

#### Returns

`void`

The initial state.

***

### setTimeWindow()

> **setTimeWindow**(`timeWindow`): `void`

Defined in: [index.ts:133](https://github.com/BlinkID/blinkid-web/blob/main/packages/feedback-stabilizer/src/index.ts)

Updates the time window used for state stabilization

#### Parameters

##### timeWindow

`number`

New time window in milliseconds

#### Returns

`void`
