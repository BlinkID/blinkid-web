/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import {
  loadBlinkIdCore,
  ProgressStatusCallback,
} from "@microblink/blinkid-core";

// Create a progress element to visualize the loading
const progressElement = document.createElement("div");
progressElement.style.position = "fixed";
progressElement.style.top = "20px";
progressElement.style.left = "20px";
progressElement.style.padding = "10px";
progressElement.style.background = "#fff";
progressElement.style.border = "1px solid #ccc";
progressElement.style.borderRadius = "4px";
document.body.appendChild(progressElement);

const progressCallback: ProgressStatusCallback = (progress) => {
  progressElement.textContent = `Loading: ${progress.progress}%`;
};

const blinkIdCore = await loadBlinkIdCore(
  {
    licenseKey: import.meta.env.VITE_LICENCE_KEY,
  },
  progressCallback,
);

const session = await blinkIdCore.createBlinkIdScanningSession();

const frameResult = await session.process(new ImageData(1920, 1080));
console.log("frameResult", frameResult);

const result = await session.getResult();
console.log("result", result);

// cleanup memory
await blinkIdCore.terminate();
