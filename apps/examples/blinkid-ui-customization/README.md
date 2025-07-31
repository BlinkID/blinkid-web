# BlinkID UI Customization Example

This example application demonstrates how to implement custom UI with the BlinkID SDK. It provides practical examples of replacing the default error modals with custom implementations that match your application's design and user experience requirements.

## Functionality

The application demonstrates custom UI implementations for the following error states:

1. **Camera Errors**: Custom dialog for camera permission denied, device not found, or other camera-related issues.

2. **Timeout Errors**: Custom dialog displayed when document scanning takes longer than the configured timeout duration.

3. **Unsupported Document Errors**: Custom dialog shown when the scanned document type is not supported by the BlinkID engine.

4. **Filtered Document Errors**: Custom dialog displayed when a document doesn't match your custom business logic filters (e.g., only accepting documents from specific countries).

## Key Features Demonstrated

- **Custom Error UI Implementation**: Shows how to disable default error modals and implement custom dialogs with consistent styling.
- **Error State Management**: Demonstrates proper handling of different error callbacks and state management using SolidJS signals.
- **Modal Design Patterns**: Provides reusable dialog styles and interaction patterns that can be adapted to your application's design system.
- **Error Recovery**: Shows how to implement proper error recovery flows, allowing users to retry operations or cancel them gracefully.
- **Event Handling**: Illustrates how to subscribe to different error events from the CameraManager and BlinkIdUxManager.
- **Configuration Options**: Demonstrates how to disable built-in error modals and configure the SDK for custom error handling.

## Custom UI Examples

### Camera Error Dialog

- **Trigger**: Camera permission denied, device not found, or camera initialization failure
- **Features**: Clear error message, retry and cancel buttons, distinctive red styling
- **Recovery**: Allows retrying camera access or canceling the operation

### Timeout Error Dialog

- **Trigger**: Scanning takes longer than the configured timeout duration (10 seconds in this example)
- **Features**: Helpful guidance text, try again and cancel options, yellow warning styling
- **Recovery**: Restarts the scanning process or allows cancellation

### Unsupported Document Dialog

- **Trigger**: Document type is not supported by the BlinkID engine
- **Features**: Clear explanation of supported document types, neutral gray styling
- **Recovery**: Prompts user to try a different document type

### Filtered Document Dialog

- **Trigger**: Document passes BlinkID validation but fails custom business logic filters
- **Features**: Specific feedback about filter requirements, blue informational styling
- **Recovery**: Guides user to provide a document meeting the specific criteria

## How to Run

For detailed instructions on how to install dependencies and run this example, please refer to the [main README file](./../README.md).
