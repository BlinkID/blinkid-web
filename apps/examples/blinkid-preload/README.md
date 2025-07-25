# BlinkID Preload Example

This example application demonstrates how to improve the user experience by preloading the BlinkID SDK components before they are needed. This can significantly reduce the perceived loading time when the user initiates the document scanning process.

## Functionality

The application simulates a user signup flow with the following steps:

1.  **Intro**: A welcome screen with a "Start Demo" button.

2.  **Form Input**: A form where the user can enter their email and phone number. While the user is on this step, the BlinkID SDK is loaded in the background.

3.  **Document Scan**: After the user fills out the form and clicks "Continue," the application transitions to the document scanning interface. Because the SDK has already been preloaded, the camera and scanning UI appear almost instantly.

4.  **Success/Error**: Upon completion of the scanning process, the application displays either a success screen with the scanning results or an error message.

## Key Features Demonstrated

- **Preloading Strategy**: Shows how to preload the BlinkID SDK (`@microblink/blinkid-core`) in the background while the user is engaged in a different task (e.g., filling out a form).
- **Improved User Experience**: By preloading the SDK, the application minimizes the waiting time for the user when they start the actual scanning process, leading to a smoother and more responsive feel.
- **State Management**: Uses SolidJS signals and effects to manage the application's state and trigger the preloading and scanning processes at the appropriate times.
- **Dynamic UI**: The UI changes dynamically based on the current step of the signup flow.

## How to Run

For detailed instructions on how to install dependencies and run this example, please refer to the [main README file](./../README.md).
