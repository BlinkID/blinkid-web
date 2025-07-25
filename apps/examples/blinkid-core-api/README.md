# BlinkID Core API Example

This example application demonstrates the basic usage of the `@microblink/blinkid-core` API. It showcases how to initialize the BlinkID SDK, create a scanning session, and process a blank image. This example is intended to be run in a Node.js environment or a browser that can execute TypeScript, and it does not include any UI components.

## Functionality

The application performs the following actions:

1.  **Loads the BlinkID Core**: It initializes the BlinkID SDK with a license key and an optional progress callback to monitor the loading status of the WASM module.

2.  **Creates a Scanning Session**: Once the SDK is loaded, it creates a new `BlinkIdScanningSession`.

3.  **Processes a Frame**: The example simulates the scanning process by calling the `process` method with a newly created `ImageData` object (1920x1080). This demonstrates how a single frame would be processed.

4.  **Retrieves the Result**: After processing the frame, it calls the `getResult` method to retrieve the final scanning result.

5.  **Logs the Output**: The results of both the frame processing and the final result retrieval are logged to the console.

## Key Features Demonstrated

- **Direct API Usage**: Shows how to use the `blinkid-core` API directly, without any UI or higher-level managers.
- **SDK Initialization**: Demonstrates how to load and initialize the BlinkID SDK with a license key.
- **Session Management**: Illustrates the creation of a scanning session.
- **Frame Processing**: Shows how to process an `ImageData` object, which would typically come from a camera feed.
- **Result Retrieval**: Demonstrates how to get the final result from the scanning session.

## How to Run

For detailed instructions on how to install dependencies and run this example, please refer to the [main README file](./../README.md).
