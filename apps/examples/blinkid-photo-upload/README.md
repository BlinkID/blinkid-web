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

## How to Run

For detailed instructions on how to install dependencies and run this example, please refer to the [main README file](./../README.md).
