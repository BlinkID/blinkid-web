/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

class MockImageData implements ImageData {
  readonly data: Uint8ClampedArray;
  readonly width: number;
  readonly height: number;
  readonly colorSpace: "srgb" | "display-p3";

  constructor(widthOrData: number | Uint8ClampedArray, height?: number) {
    if (typeof widthOrData === "number") {
      // new ImageData(width, height)
      this.width = widthOrData;
      this.height = height || 1;
      this.data = new Uint8ClampedArray(this.width * this.height * 4);
    } else {
      // new ImageData(data, width, height?)
      this.data = widthOrData;
      this.width = height || 1;
      this.height = arguments[2] || 1;
    }
    this.colorSpace = "srgb";
  }
}

// Only set if ImageData doesn't exist
if (!globalThis.ImageData) {
  globalThis.ImageData = MockImageData;
}
