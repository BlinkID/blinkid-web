[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / BlinkIdSessionSettings

# Type Alias: BlinkIdSessionSettings

> **BlinkIdSessionSettings** = `object`

Represents the configuration settings for a scanning session.

This structure holds the settings related to the resources initialization,
input image source, scanning mode, and specific scanning configurations that
define how the scanning session should behave.

The settings control various aspects of the scanning process including:

- Input source (video stream or single photo)
- Scanning mode (single or multiple sides)
- Document detection and quality analysis
- Image processing and result extraction

## Properties

### inputImageSource

> **inputImageSource**: [`InputImageSource`](InputImageSource.md)

The type of image source for the scanning session.

Defines whether the images are sourced from a video stream or a single
photo, as defined by `InputImageSource`. The default is set to `video` for
real-time scanning through a camera feed.

- `video` - Uses continuous camera feed for scanning
- `photo` - Uses a single captured photo for scanning

#### Default Value

`video`

***

### scanningMode

> **scanningMode**: [`ScanningMode`](ScanningMode.md)

The scanning mode to be used during the scanning session.

Specifies whether the scanning is for a single side of a document or
multiple sides, as defined in `ScanningMode`. The default is set to
`automatic`, which automatically determines the number of sides to scan
based on the detected document type.

- `automatic` - Automatically determines required sides
- `single` - Scans only one side

#### Default Value

`automatic`

***

### scanningSettings

> **scanningSettings**: [`ScanningSettings`](ScanningSettings.md)

The specific scanning settings for the scanning session.

Defines various parameters that control the scanning process including:

- Document detection and quality thresholds
- Image processing options
- Result extraction and validation rules
- Document-specific scanning behaviors

#### See

`ScanningSettings` for detailed configuration options
