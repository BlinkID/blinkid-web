# BlinkID Advanced Setup Example

This example application demonstrates an advanced setup of the BlinkID SDK, showcasing the integration of various components such as `@microblink/blinkid-core`, `@microblink/blinkid-ux-manager`, and `@microblink/camera-manager`.

## Functionality

The application performs the following actions:

1.  **Initializes the BlinkID Core**: It starts by loading the WebAssembly (WASM) module and initializing the scanning engine with a license key.

2.  **Creates a Scanning Session**: A new scanning session is created with specific settings.

3.  **Manages the Camera**: It utilizes the `CameraManager` to handle the camera stream.

4.  **Manages the User Experience**: The `BlinkIdUxManager` is used to orchestrate the user experience, managing the interaction between the camera and the scanning session.

5.  **Renders the UI**: The application creates and mounts the camera and feedback UI components to the DOM. It provides an option to show or hide an onboarding guide for the user.

6.  **Handles Results**: Upon successful scanning, the application displays the scanning results. It also includes a feature to display debug information, such as the scanning score.

7.  **Cleanup**: When the UI is dismounted, the application terminates the BlinkID Core instance to free up resources.

## Key Features Demonstrated

- **Modular Integration**: Shows how to import and use different modules of the BlinkID SDK (`blinkid-core`, `blinkid-ux-manager`, `camera-manager`) independently.
- **Manual Control**: Demonstrates how to manually control the initialization, scanning process, and UI components.
- **Custom UI**: Provides an example of how to integrate the SDK's UI components into a custom application layout.
- **Event Handling**: Shows how to subscribe to events from the `CameraManager` and `BlinkIdUxManager` to create a responsive user experience.
- **Result Handling**: Illustrates how to receive and process the scanning results.

## How to Run

For detailed instructions on how to install dependencies and run this example, please refer to the [main README file](./../README.md).
