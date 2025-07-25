# Camera Manager Example

This example application demonstrates how to use the `@microblink/camera-manager` package to access and control the device's camera. It showcases how to capture video frames and display them on a canvas element.

## Functionality

The application provides a "Scan" button that, when clicked, performs the following actions:

1.  **Initializes Camera Manager**: It creates an instance of the `CameraManager`.

2.  **Creates Camera UI**: It uses `createCameraManagerUi` to create and display the camera feed and UI controls.

3.  **Starts the Camera Stream**: It calls `startCameraStream` to begin receiving video from the selected camera.

4.  **Processes Frames**: If `PROCESS_FRAMES` is enabled, the application:

    - Adds a callback to `addFrameCaptureCallback` to process each video frame.
    - Renders the received `ImageData` onto an HTML `<canvas>` element.
    - Uses a simple FPS counter (`yy-fps`) to monitor the frame rate.
    - Starts the frame capture loop with `startFrameCapture`.

5.  **Handles Cleanup**: It registers a cleanup function using `addOnDismountCallback` to stop the FPS counter and remove the frame capture callback when the camera UI is closed.

## Key Features Demonstrated

- **Camera Control**: Shows how to use `CameraManager` to start the camera stream and manage the camera UI.
- **Frame Capturing**: Illustrates how to capture individual frames from the video stream using `addFrameCaptureCallback` and `startFrameCapture`.
- **Rendering to Canvas**: Provides a basic example of how to take the captured `ImageData` and draw it onto a canvas.
- **Lifecycle Management**: Demonstrates the proper way to clean up resources when the camera is no longer in use.

## How to Run

For detailed instructions on how to install dependencies and run this example, please refer to the [main README file](./../README.md).
