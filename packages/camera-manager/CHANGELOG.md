# @microblink/camera-manager

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
