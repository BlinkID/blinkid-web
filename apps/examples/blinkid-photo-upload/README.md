# BlinkID Photo Upload Example

This example demonstrates how to implement document scanning using BlinkID SDK with a photo upload approach. Instead of using the camera directly, this example allows users to upload images of documents for processing.

## Features

- Front side document scanning
- Automatic detection of two-sided documents
- Support for barcode scanning when required
- Real-time processing status feedback
- Image thumbnails preview
- Detailed processing results for each scan
- Complete scanning result display
- Session management and cleanup
- Restart functionality

## Implementation Details

### Core Components

- Uses `@microblink/blinkid-core` for document scanning
- Built with SolidJS for reactive UI
- Implements proper resource cleanup (object URLs, sessions)

### Scanning Flow

1. **Front Side Upload**

   - User uploads front side image
   - System processes the image and determines next steps
   - Shows processing status and thumbnail

2. **Back Side Upload** (if required)

   - Automatically shown if document requires back side
   - Only enabled after successful front side scan
   - Shows processing status and thumbnail

3. **Barcode Upload** (if required)
   - Shown if barcode recognition fails on previous steps
   - Allows specific upload for barcode processing
   - Shows processing status and thumbnail

### Error Handling

- Comprehensive error handling for:
  - File selection errors
  - Processing failures
  - Session management issues
  - Resource cleanup
- Clear error messages displayed to users
- Automatic cleanup of failed uploads

### State Management

- Tracks scanning progress for each step
- Manages document side requirements
- Handles session state
- Maintains processing results
- Manages image preview URLs

## Usage

1. Configure the license key in your environment:

   ```
   VITE_LICENCE_KEY=your-license-key
   ```

2. Initialize the application:

   ```typescript
   import App from './App';

   // Mount the component
   render(() => <App />, document.getElementById('root'));
   ```

3. Use the interface to:
   - Upload front side image
   - Upload back side (if required)
   - Upload barcode image (if required)
   - View processing results
   - Restart scanning process

## Key Features

### Automatic Flow Detection

The example automatically determines the required scanning steps based on the document:

- Detects if back side is needed
- Identifies when barcode scanning is required
- Provides appropriate UI for each step

### Real-time Feedback

Users receive immediate feedback on:

- Processing status
- Success/failure of each step
- Required next steps
- Complete scanning results

### Resource Management

The example implements proper resource management:

- Automatic cleanup of image URLs
- Session cleanup after completion
- Memory management for large images
- Proper error state cleanup

### User Experience

- Clear step-by-step interface
- Visual confirmation of completed steps
- Detailed processing information (expandable)
- Easy restart functionality
- Responsive design

## Technical Considerations

### Session Management

The application maintains a single scanning session throughout the process:

```typescript
const initBlinkIdScanningSession = async (): Promise<BlinkIdSession> => {
  const blinkIdCore = await loadBlinkIdCore({
    licenseKey: import.meta.env.VITE_LICENCE_KEY,
  });

  return blinkIdCore.createBlinkIdScanningSession({
    inputImageSource: "photo",
  });
};
```

### Image Processing

Implements efficient image processing:

```typescript
const createImageData = async (file: File): Promise<ImageData> => {
  const img = new Image();
  const url = URL.createObjectURL(file);
  // ... image processing logic
};
```

### Status Handling

Provides utility functions for status management:

```typescript
const isErrorStatus = (status: string) =>
  status !== "success" && status !== "awaiting-other-side";

const isBarcodeError = (status: string) =>
  status === "barcode-recognition-failed";
```

## Best Practices

1. **Resource Cleanup**

   - Always cleanup object URLs
   - Properly manage scanning sessions
   - Reset file inputs after use

2. **Error Handling**

   - Provide clear error messages
   - Cleanup resources on error
   - Maintain consistent UI state

3. **User Experience**

   - Show processing status
   - Provide visual feedback
   - Enable/disable controls appropriately

4. **Performance**
   - Efficient image processing
   - Proper memory management
   - Optimized session handling

## Requirements

- Modern web browser with JavaScript enabled
- Valid BlinkID license key
- Environment supporting ES6+ features
- Node.js and npm/pnpm for development

## Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   echo "VITE_LICENCE_KEY=your-license-key" > .env
   ```

3. Start development server:
   ```bash
   pnpm dev
   ```

## License

This example is part of the BlinkID SDK. Please refer to the main SDK license for usage terms and conditions.
