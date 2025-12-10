# @microblink/camera-manager

## 7.2.7

### Patch Changes

- Updated the camera picking logic
- Improved error handling on the `Camera` class

## 7.2.6

### Patch Changes

- Implemented a mechanism for observing the camera permission state, available on the `cameraPermission` property on the `CameraManagerStore`
- Added `videoResolution` and `extractionArea` properties on `CameraManagerStore`
- Added a generic error dialog for camera errors that might not be a permission error.
- Added translation files for 33 new languages (see [README.md](README.md#provided-translations))
- Update dependencies

## 7.2.5

### Patch Changes

- Fixed types

## 7.2.4

### Patch Changes

- Reduced the default resolution to `1080p`
- Preferred camera resolution can now be set through `CameraManager` constructor

### Bug Fixes

- Fixed issue with some iPhonePro devices where rotating device would not report correct clientWidth/clientHeight on callback.

## 7.2.3

### Patch Changes

- Add camera error modal visibility control
  - Introduced `showCameraErrorModal` property in `CameraUiStore` to manage the visibility of the camera error modal.
  - Updated `CaptureScreen` component to conditionally render `CameraErrorModal` based on the new property.

## 7.2.2

### Patch Changes

- Improved documentation

## 7.2.1

### Patch Changes

- Fixed an issue where the camera failed to start on certain Windows desktop devices.

## 7.2.0

### Minor Changes

- Enhanced customization capabilities with additional modification options.
- Added `showTorchButton` and `showCloseButton` properties to `CameraManagerUiOptions` for improved UI control.
- Added part attribute `camera-select-part` to the camera select element to enable external styling.
- Added part attribute `video-element-part` to the video element to enable external styling.

## 7.1.0

### Minor Changes

## 7.0.1

### Patch Changes

- Bump package version
