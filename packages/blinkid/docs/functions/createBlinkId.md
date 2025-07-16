[**@microblink/blinkid**](../README.md)

---

[@microblink/blinkid](../README.md) / createBlinkId

# Function: createBlinkId()

> **createBlinkId**(`options`): `Promise`\<[`BlinkIdComponent`](../type-aliases/BlinkIdComponent.md)\>

Defined in: [packages/blinkid/src/createBlinkIdUi.ts:126](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/src/createBlinkIdUi.ts)

Creates a BlinkID component with all necessary SDK instances and UI elements.

This function initializes the complete BlinkID scanning system including:

- BlinkID Core SDK for document processing
- Camera Manager for video capture and camera control
- UX Manager for coordinating scanning workflow
- Camera UI for video display and camera controls
- Feedback UI for scanning guidance and status

The function sets up the entire scanning pipeline and returns a component
object that provides access to all SDK instances and destruction capabilities.

## Parameters

### options

Configuration options for the BlinkID component

#### cameraManagerUiOptions?

`Partial`\<`CameraManagerUiOptions`\>

Customization options for the camera manager UI.
Controls camera-related UI elements like the video feed container and camera selection.

#### feedbackLocalization?

`Partial`\<`LocalizationStrings`\>

Custom localization strings for the feedback UI.
Allows overriding default text messages shown during scanning.

#### feedbackUiOptions?

`Partial`\<`FeedbackUiOptions`\>

Customization options for the feedback UI.
Controls the appearance and behavior of scanning feedback elements.

#### targetNode?

`HTMLElement`

The HTML element where the BlinkID UI will be mounted.
If not provided, the UI will be mounted to the document body.

## Returns

`Promise`\<[`BlinkIdComponent`](../type-aliases/BlinkIdComponent.md)\>

Promise that resolves to a BlinkIdComponent with all SDK instances and UI elements

## Example

```typescript
const blinkId = await createBlinkId({
  licenseKey: "your-license-key",
  targetNode: document.getElementById("blinkid-container"),
  feedbackUiOptions: {
    showOnboardingGuide: false,
  },
});

// Add result callback
blinkId.addOnResultCallback((result) => {
  console.log("Scanning result:", result);
});

// Clean up when done
await blinkId.destroy();
```
