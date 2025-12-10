# @microblink/blinkid-worker

## 7.6.3

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.6.3

## 7.6.2

### Patch Changes

- Fixes `microblinkProxyUrl` handling
  - Prevent an extra ping to the Microblink server when a proxy URL is configured (previously one redundant request was sent).
  - Preserve the user-provided path when using a proxy URL (previously the path was removed).
- Updated dependencies
  - @microblink/blinkid-wasm@7.6.2

## 7.6.1

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.6.1

## 7.6.0

### Minor Changes

- Add support for ping v3

### Patch Changes

- Update dependencies
- Updated dependencies
- Updated dependencies [8e05b35]
  - @microblink/blinkid-wasm@7.6.0

## 7.5.0

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.5.0

## 7.4.3

### Patch Changes

- Bump versions
- Updated dependencies
  - @microblink/blinkid-wasm@7.4.3

## 7.4.2

### Patch Changes

- Improved `loadBlinkIdCore()` callback. `loadProgress` is now called even when resources response does not have `Content-Length` header
- Updated dependencies
  - @microblink/blinkid-wasm@7.4.2

## 7.4.1

### Patch Changes

- Enhance error handling in `BlinkIdWorker`
  - Introduced `LicenseError` class to handle licence unlock failures, including a specific error code.
  - Exported `ProxyUrlValidationError` class for external usage.

## 7.4.0

### Minor Changes

- Improved documentation
- Updated dependencies
  - @microblink/blinkid-wasm@7.4.0

## 7.3.2

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.3.2

## 7.3.1

### Patch Changes

- Fixed an issue where BlinkIdModule.worker.mjs was incorrectly requested over the network.

## 7.3.0

### Minor Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.3.0

## 7.2.2

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.2.2

## 7.2.1

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.2.1

## 7.2.0

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.2.0

## 7.1.0

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.1.0

## 7.0.1

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.0.1
