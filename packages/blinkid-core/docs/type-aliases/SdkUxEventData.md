[**@microblink/blinkid-core**](../README.md)

***

[@microblink/blinkid-core](../README.md) / SdkUxEventData

# Type Alias: SdkUxEventData

> **SdkUxEventData** = `object`

Represents the data for the `ping.sdk.ux.event` event.

## Properties

### alertType?

> `optional` **alertType**: `"InvalidLicenseKey"` \| `"NetworkError"` \| `"DocumentClassNotAllowed"` \| `"StepTimeout"`

***

### errorMessageType?

> `optional` **errorMessageType**: `"MoveCloser"` \| `"MoveFarther"` \| `"KeepVisible"` \| `"FlipSide"` \| `"AlignDocument"` \| `"MoveFromEdge"` \| `"IncreaseLighting"` \| `"DecreaseLighting"` \| `"EliminateBlur"` \| `"EliminateGlare"`

***

### eventType

> **eventType**: `"CameraStarted"` \| `"CameraClosed"` \| `"OnboardingInfoDisplayed"` \| `"CloseButtonClicked"` \| `"HelpTooltipDisplayed"` \| `"HelpOpened"` \| `"HelpClosed"` \| `"AlertDisplayed"` \| `"ErrorMessage"` \| `"StepTimeout"` \| `"AppMovedToBackground"`

***

### helpCloseType?

> `optional` **helpCloseType**: `"ContentSkipped"` \| `"ContentFullyViewed"`
