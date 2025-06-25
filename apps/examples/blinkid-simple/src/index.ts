/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { createBlinkId } from "@microblink/blinkid";

const blinkid = await createBlinkId({
  licenseKey: import.meta.env.VITE_LICENCE_KEY,
  cameraManagerUiOptions: {
    showMirrorCameraButton: false,
  },
});

blinkid.addOnResultCallback((result) => {
  console.log("Result:", result);
  void blinkid.destroy();
});
