# @microblink/blinkid-ux-manager

## 7.4.2

### Patch Changes

- `BlinkIdUxManager` will now clear session object on `DOCUMENT_CAPTURED` event
- Added 2 new methods `getSessionResult` and `safelyDeleteScanningSession`
- Updated dependencies
  - @microblink/camera-manager@7.2.4
  - @microblink/blinkid-core@7.4.2

## 7.4.1

### Patch Changes

- Enhanced reset session behaviour in `BlinkIdUxManager`
  - Exposed new `resetScanningSession` method
  - Enhance `BlinkIdFeedbackUi` with modal visibility controls
  - Added new properties to manage the visibilty of document filtered, timeout, and unsupported document modals in the `BlinkIdUiStore`
- Fixed issue where `ErrorModal` would not close in some cases.
- Fixed issue where UI had stale state after session restart.
- Updated dependencies
  - @microblink/camera-manager@7.2.3
  - @microblink/blinkid-core@7.4.1

## 7.4.0

### Minor Changes

- Improved documentation
- Updated dependencies
  - @microblink/blinkid-core@7.4.0
  - @microblink/camera-manager@7.2.2

## 7.3.2

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-core@7.3.2

## 7.3.1

### Patch Changes

- Updated dependencies
  - @microblink/camera-manager@7.2.1
  - @microblink/blinkid-core@7.3.1

## 7.3.0

### Minor Changes

- Added `showHelpButton` property to `FeedbackUiOptions` for improved UI control.
- Added part attribute `help-button-part` to the help button to enable external styling.
- Added additional control of the help tooltip via `setHelpTooltipShowDelay` and `setHelpTooltipHideDelay` methods on the `BlinkIdUxManager`
- `setTimeoutDuration` now defaultly sets `setHelpTooltipShowDelay` to the 50% duration
- Updated help tooltip default behaviour
- Updated dependencies
  - @microblink/camera-manager@7.2.0
  - @microblink/blinkid-core@7.3.0

## 7.2.2

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-core@7.2.2

## 7.2.1

### Patch Changes

- @microblink/blinkid-core@7.2.1

## 7.2.0

### Minor Changes

- Implemented passport feedback
- Added document filtered callbacks
- Various bug fixes

### Patch Changes

- @microblink/blinkid-core@7.2.0

## 7.1.0

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-core@7.1.0
  - @microblink/camera-manager@7.1.0

## 7.0.1

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-core@7.0.1
  - @microblink/camera-manager@7.0.1
