[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / createBlinkId

# Function: createBlinkId()

> **createBlinkId**(`options`): `Promise`\<[`BlinkIdComponent`](../type-aliases/BlinkIdComponent.md)\>

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

`Partial`\<[`CameraManagerUiOptions`](../type-aliases/CameraManagerUiOptions.md)\>

Customization options for the camera manager UI.
Controls camera-related UI elements like the video feed container and camera selection.

#### feedbackLocalization?

`Partial`\<[`LocalizationStrings`](../type-aliases/LocalizationStrings.md)\>

Custom localization strings for the feedback UI.
Allows overriding default text messages shown during scanning.

#### feedbackUiOptions?

`Partial`\<[`FeedbackUiOptions`](../type-aliases/FeedbackUiOptions.md)\>

Customization options for the feedback UI.
Controls the appearance and behavior of scanning feedback elements.

#### initialMemory?

`number`

The initial memory allocation for the Wasm module, in megabytes.
Larger values may improve performance but increase memory usage.

#### licenseKey

`string`

The license key required to unlock and use the BlinkID SDK.
This must be a valid license key obtained from Microblink.

#### microblinkProxyUrl?

`string`

The URL of the Microblink proxy server. This proxy handles requests to Microblink's Baltazar and Ping servers.

**Requirements:**
- Must be a valid HTTPS URL
- The proxy server must implement the expected Microblink API endpoints
- This feature is only available if explicitly permitted by your license

**Endpoints:**
- Ping: `{proxyUrl}/ping`
- Baltazar: `{proxyUrl}/api/v2/status/check`

**Example**

```ts
"https://your-proxy.example.com"
```

#### resourcesLocation?

`string`

The parent directory where the `/resources` directory is hosted.
Defaults to `window.location.href`, at the root of the current page.

#### scanningMode?

[`ScanningMode`](../type-aliases/ScanningMode.md)

The scanning mode to be used during the scanning session.

Specifies whether the scanning is for a single side of a document or
multiple sides, as defined in `ScanningMode`. The default is set to
`automatic`, which automatically determines the number of sides to scan
based on the detected document type.

- `automatic` - Automatically determines required sides

- `single` - Scans only one side

**Default Value**

`automatic`

#### scanningSettings?

[`ScanningSettings`](../type-aliases/ScanningSettings.md)

The specific scanning settings for the scanning session.

Defines various parameters that control the scanning process including:

- Document detection and quality thresholds
- Image processing options
- Result extraction and validation rules
- Document-specific scanning behaviors

**See**

`ScanningSettings` for detailed configuration options

#### targetNode?

`HTMLElement`

The HTML element where the BlinkID UI will be mounted.
If not provided, the UI will be mounted to the document body.

#### useLightweightBuild?

`boolean`

Whether to use the lightweight build of the SDK.
Lightweight builds have reduced size but may have limited functionality.

#### userId?

`string`

A unique identifier for the user/session.
Used for analytics and tracking purposes.

#### wasmVariant?

`WasmVariant`

The WebAssembly module variant to use.
Different variants may offer different performance/size tradeoffs.

## Returns

`Promise`\<[`BlinkIdComponent`](../type-aliases/BlinkIdComponent.md)\>

Promise that resolves to a BlinkIdComponent with all SDK instances and UI elements

## Example

```typescript
const blinkId = await createBlinkId({
  licenseKey: "your-license-key",
  targetNode: document.getElementById("blinkid-container"),
  feedbackUiOptions: {
    showOnboardingGuide: false
  }
});

// Add result callback
blinkId.addOnResultCallback((result) => {
  console.log("Scanning result:", result);
});

// Clean up when done
await blinkId.destroy();
```
