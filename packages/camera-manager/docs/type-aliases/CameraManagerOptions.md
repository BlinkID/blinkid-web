[**@microblink/camera-manager**](../README.md)

***

[@microblink/camera-manager](../README.md) / CameraManagerOptions

# Type Alias: CameraManagerOptions

> **CameraManagerOptions** = `object`

Options for the CameraManager.

## Param

If true, front-facing cameras will be mirrored horizontally when started.

## Param

The desired video resolution for camera streams. This is used as the ideal resolution when starting camera streams. If a camera doesn't support the specified resolution, the camera will automatically fall back to the next lower supported resolution in this order: 4k → 1080p → 720p.

## Properties

### mirrorFrontCameras

> **mirrorFrontCameras**: `boolean`

If true, the camera stream will be mirrored horizontally when started.

***

### preferredResolution

> **preferredResolution**: [`VideoResolutionName`](VideoResolutionName.md)

The desired video resolution for camera streams. This is used as the ideal resolution
when starting camera streams. If a camera doesn't support the specified resolution,
the camera will automatically fall back to the next lower supported resolution in this order:
4k → 1080p → 720p. The actual resolution used may differ from this setting based on
camera capabilities and system constraints.
