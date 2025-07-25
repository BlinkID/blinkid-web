# Camera Selection Example

This example application demonstrates the various ways to select a preferred camera using the `@microblink/camera-manager` package.

## Functionality

The application provides a "Scan" button that initializes the `CameraManager` and starts the camera stream. The key part of this example is the configuration passed to the `startCameraStream` method, which shows different strategies for camera selection.

## Key Features Demonstrated

The `startCameraStream` method accepts a `preferredCamera` option, which can be specified in several ways:

1.  **By Camera Instance**: You can pass a specific `Camera` object, which can be obtained by calling `cameraManager.getCameraDevices()`.

2.  **By Callback Function**: You can provide a callback function that receives an array of available `Camera` devices. You can then implement your own logic to select the desired camera. The example shows how to find a camera by its name (e.g., "FaceTime").

3.  **By Facing Mode**: You can specify the `preferredFacing` mode.
    - As a single string (e.g., `"back"` or `"front"`).
    - As an array of strings (e.g., `["back", "front"]`), which defines the order of preference.

## How to Run

For detailed instructions on how to install dependencies and run this example, please refer to the [main README file](./../README.md).
