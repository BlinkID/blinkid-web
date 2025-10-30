# @microblink/camera-manager

This package provides camera management for web applications. It handles camera selection, permissions, video stream management, and provides access to video frames for further processing. It is framework-agnostic and can be used with or without a UI.

## Overview

- Handles camera selection, permissions, and video stream lifecycle.
- Provides access to video frames for downstream processing.
- Can be used standalone or with the included UI components.
- Used by [`@microblink/blinkid-ux-manager`](https://www.npmjs.com/package/@microblink/blinkid-ux-manager) and [`@microblink/blinkid`](https://www.npmjs.com/package/@microblink/blinkid).

## Installation

Install from npm using your preferred package manager:

```sh
npm install @microblink/camera-manager
# or
yarn add @microblink/camera-manager
# or
pnpm add @microblink/camera-manager
```

## Usage

### Basic Example

```js
import { CameraManager } from "@microblink/camera-manager";

const cameraManager = new CameraManager();

// Start the camera stream (auto-selects the best camera)
await cameraManager.startCameraStream();

// Optionally, attach the video to a DOM element
const video = document.getElementById("video");
cameraManager.initVideoElement(video);

// Capture frames for processing
const removeCallback = cameraManager.addFrameCaptureCallback((imageData) => {
  // Process imageData (instance of ImageData)
});

// Stop the camera when done
cameraManager.stopStream();
```

See the [`camera-manager` example](../../apps/examples/camera-manager/src/App.tsx) for more usage details.

## API

### `CameraManager` class

- `startCameraStream(options?)`: Starts the camera stream. Options allow selecting a specific camera or facing mode.
- `initVideoElement(videoElement)`: Attaches a video element for preview.
- `addFrameCaptureCallback(callback)`: Registers a callback to receive frames as `ImageData` during capture. Returns a cleanup function.
- `startFrameCapture()`: Starts capturing frames for processing.
- `stopFrameCapture()`: Stops capturing frames but keeps the stream active.
- `stopStream()`: Stops the camera stream and video playback.
- `setResolution(resolution)`: Sets the desired video resolution (e.g., `"1080p"`).
- `setFacingFilter(facingModes)`: Filters available cameras by facing mode (`"front"` or `"back"`).
- `getCameraDevices()`: Returns available camera devices.
- `selectCamera(camera)`: Selects a specific camera device.
- `setCameraMirrorX(mirrorX)`: Mirrors the video horizontally if needed.
- `reset()`: Resets the camera manager and stops all streams.

### UI Integration

To use the built-in UI, use:

```js
import { createCameraManagerUi } from "@microblink/camera-manager";

const cameraUi = await createCameraManagerUi(cameraManager, document.body);
// Optionally, add cleanup:
cameraUi.dismount();
```

### Internationalization

You can customize UI strings either when creating the camera UI or at runtime:

```
const cameraUi = await createCameraManagerUi(
  cameraManager,
  undefined,
  {
    localizationStrings: {
      selected_camera: "My Updated String",
    },
  },
);
```

At runtime:

```
cameraUi.updateLocalization({
  select_camera: "My updated string",
});

```

#### Provided Translations

<details>
<summary>Click to see all available translation files</summary>

- [ak.ts](src/ui/locales/ak.ts)
- [am.ts](src/ui/locales/am.ts)
- [ar.ts](src/ui/locales/ar.ts)
- [bn.ts](src/ui/locales/bn.ts)
- [cs.ts](src/ui/locales/cs.ts)
- [da.ts](src/ui/locales/da.ts)
- [de.ts](src/ui/locales/de.ts)
- [el.ts](src/ui/locales/el.ts)
- [en.ts](src/ui/locales/en.ts)
- [en_GB.ts](src/ui/locales/en_GB.ts)
- [es.ts](src/ui/locales/es.ts)
- [es_MX.ts](src/ui/locales/es_MX.ts)
- [fa-latn.ts](src/ui/locales/fa-latn.ts)
- [fi.ts](src/ui/locales/fi.ts)
- [fil.ts](src/ui/locales/fil.ts)
- [fr.ts](src/ui/locales/fr.ts)
- [fr_CA.ts](src/ui/locales/fr_CA.ts)
- [ha.ts](src/ui/locales/ha.ts)
- [he.ts](src/ui/locales/he.ts)
- [hi.ts](src/ui/locales/hi.ts)
- [hr.ts](src/ui/locales/hr.ts)
- [hu.ts](src/ui/locales/hu.ts)
- [id.ts](src/ui/locales/id.ts)
- [is.ts](src/ui/locales/is.ts)
- [it.ts](src/ui/locales/it.ts)
- [ja.ts](src/ui/locales/ja.ts)
- [ka_GE.ts](src/ui/locales/ka_GE.ts)
- [kk.ts](src/ui/locales/kk.ts)
- [km_KH.ts](src/ui/locales/km_KH.ts)
- [ko.ts](src/ui/locales/ko.ts)
- [lv.ts](src/ui/locales/lv.ts)
- [ms.ts](src/ui/locales/ms.ts)
- [ne.ts](src/ui/locales/ne.ts)
- [nl.ts](src/ui/locales/nl.ts)
- [no.ts](src/ui/locales/no.ts)
- [pl.ts](src/ui/locales/pl.ts)
- [ps_AF.ts](src/ui/locales/ps_AF.ts)
- [pt.ts](src/ui/locales/pt.ts)
- [pt_BR.ts](src/ui/locales/pt_BR.ts)
- [ro.ts](src/ui/locales/ro.ts)
- [ru.ts](src/ui/locales/ru.ts)
- [si.ts](src/ui/locales/si.ts)
- [sk.ts](src/ui/locales/sk.ts)
- [sl.ts](src/ui/locales/sl.ts)
- [sr.ts](src/ui/locales/sr.ts)
- [sv.ts](src/ui/locales/sv.ts)
- [sw.ts](src/ui/locales/sw.ts)
- [th.ts](src/ui/locales/th.ts)
- [tr.ts](src/ui/locales/tr.ts)
- [uk.ts](src/ui/locales/uk.ts)
- [ur.ts](src/ui/locales/ur.ts)
- [uz.ts](src/ui/locales/uz.ts)
- [vi.ts](src/ui/locales/vi.ts)
- [yo.ts](src/ui/locales/yo.ts)
- [zh_CN.ts](src/ui/locales/zh_CN.ts)
- [zh_TW.ts](src/ui/locales/zh_TW.ts)

</details>

---
You can import any of these files directly or use them as a starting point for your own localization.
