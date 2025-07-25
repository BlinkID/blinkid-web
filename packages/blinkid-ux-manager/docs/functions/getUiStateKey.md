[**@microblink/blinkid-ux-manager**](../README.md)

***

[@microblink/blinkid-ux-manager](../README.md) / getUiStateKey

# Function: getUiStateKey()

> **getUiStateKey**(`frameProcessResult`, `settings?`): [`BlinkIdUiStateKey`](../type-aliases/BlinkIdUiStateKey.md)

Determines the appropriate UI state key based on the current frame processing
result and scanning settings.

This function acts as a state machine, translating the low-level analysis and
completeness results into a high-level UI state that drives the user
interface.

## Parameters

### frameProcessResult

[`PartialProcessResult`](../type-aliases/PartialProcessResult.md)

The current (possibly partial) result of frame
processing, including image analysis and completeness.

### settings?

`Partial`\<`ScanningSettings`\>

Optional scanning settings that may influence state
selection.

## Returns

[`BlinkIdUiStateKey`](../type-aliases/BlinkIdUiStateKey.md)

The UI state key representing what should be shown to the user.
