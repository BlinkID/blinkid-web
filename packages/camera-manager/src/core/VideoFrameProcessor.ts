/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

export type CanvasRenderingMode = "2d" | "webgl2";
export type ImageSource = HTMLVideoElement | HTMLCanvasElement | ImageBitmap;

/**
 * Options for the VideoFrameProcessor.
 */
export type VideoFrameProcessorInitOptions = {
  canvasRenderingMode?: CanvasRenderingMode;
  fallbackWebGlTo2d?: boolean;
};

/**
 * Check if an ArrayBuffer is detached
 * @param buffer - ArrayBuffer to check
 * @returns true if the buffer is detached, false otherwise
 */
export function isBufferDetached(buffer: ArrayBuffer): boolean {
  const actualBuffer = getBuffer(buffer);
  // es2024
  if ("detached" in actualBuffer) {
    const detached = actualBuffer.detached as boolean;
    return detached;
  }
  // fallback
  try {
    // Try to create a view on the buffer
    new Uint8Array(actualBuffer);
    return false; // If successful, buffer is not detached
  } catch (e) {
    return true; // If it throws, buffer is detached
  }
}

/**
 * The extraction area.
 */
export type ExtractionArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * VideoFrameProcessor captures frames from video or image sources using either 2D or WebGL2 rendering
 */
export class VideoFrameProcessor {
  #canvas: HTMLCanvasElement;
  #context2d: CanvasRenderingContext2D | null = null;
  #contextWebGl2: WebGL2RenderingContext | null = null;
  #webGl2Texture: WebGLTexture | null = null;
  #webGl2Framebuffer: WebGLFramebuffer | null = null;
  #buffer: Uint8ClampedArray | null = null;
  #cachedWidth = 0;
  #cachedHeight = 0;
  #canvasRenderingMode: CanvasRenderingMode;
  #requiredPackAlignment = 4;

  /**
   * Creates a new VideoFrameProcessor.
   *
   * @param options - The options for the VideoFrameProcessor.
   */
  constructor(options: VideoFrameProcessorInitOptions = {}) {
    const { canvasRenderingMode = "webgl2", fallbackWebGlTo2d = true } =
      options;

    this.#canvasRenderingMode = canvasRenderingMode;
    this.#canvas = document.createElement("canvas");

    // Initialize rendering context
    if (canvasRenderingMode === "2d") {
      this.#initialize2dContext();
    } else if (canvasRenderingMode === "webgl2") {
      try {
        this.#initializeWebGl2Context();
      } catch (error) {
        if (fallbackWebGlTo2d) {
          console.warn(
            "Failed to create WebGL2 context, falling back to 2D canvas",
          );
          this.#canvasRenderingMode = "2d";
          this.#initialize2dContext();
        } else {
          throw error;
        }
      }
    } else {
      throw new Error(
        `Unsupported rendering context: ${canvasRenderingMode as CanvasRenderingMode}`,
      );
    }
  }

  /**
   * Initializes the 2D canvas context.
   */
  #initialize2dContext(): void {
    const ctx = this.#canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: true,
    });
    if (!ctx) throw new Error("CanvasRenderingContext2D is missing!");
    this.#context2d = ctx;
  }

  /**
   * Initializes the WebGL2 context and resources.
   */
  #initializeWebGl2Context(): void {
    // Create and configure WebGL2 context
    const ctx = this.#canvas.getContext("webgl2", {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      desynchronized: false,
      powerPreference: "high-performance",
    });
    if (!ctx) throw new Error("WebGL2RenderingContext is missing!");
    this.#contextWebGl2 = ctx;

    // Create texture
    const texture = ctx.createTexture();
    if (!texture) throw new Error("Failed to create WebGL texture");
    this.#webGl2Texture = texture;

    // Configure texture
    ctx.bindTexture(ctx.TEXTURE_2D, texture);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);

    // Create framebuffer
    const framebuffer = ctx.createFramebuffer();
    if (!framebuffer) throw new Error("Failed to create framebuffer");
    this.#webGl2Framebuffer = framebuffer;

    // Configure framebuffer
    ctx.bindFramebuffer(ctx.FRAMEBUFFER, framebuffer);
    ctx.framebufferTexture2D(
      ctx.FRAMEBUFFER,
      ctx.COLOR_ATTACHMENT0,
      ctx.TEXTURE_2D,
      texture,
      0,
    );
  }

  /**
   * Returns ownership of an ArrayBuffer to the processor for reuse.
   *
   * This should only be called with ArrayBuffers that were originally from this processor.
   * Typically used after transferring the buffer to/from a worker.
   *
   * @param arrayBuffer - The array buffer to reattach.
   */
  reattachArrayBuffer(arrayBuffer: ArrayBufferLike): void {
    // Might be a view, so get the underlying buffer
    const actualBuffer = getBuffer(arrayBuffer);

    if (isBufferDetached(actualBuffer)) {
      throw new Error("Can't use a detached array buffer!");
    }

    const requiredSize = this.#cachedWidth * this.#cachedHeight * 4;

    // Only accept buffers that match our expected size
    if (actualBuffer.byteLength === requiredSize) {
      this.#buffer = new Uint8ClampedArray(actualBuffer);
    } else {
      throw new Error(
        `ArrayBuffer size mismatch: expected ${requiredSize}, got ${actualBuffer.byteLength}`,
      );
    }
  }

  /**
   * Used to check if the processor owns the buffer.
   *
   * @returns true if the processor owns the buffer, false otherwise.
   */
  isBufferDetached(): boolean {
    if (!this.#buffer) {
      throw new Error("Buffer is missing!");
    }
    return isBufferDetached(this.#buffer.buffer);
  }

  /**
   * Extracts image data from a source element.
   *
   * @param source - The source element to extract image data from.
   * @param area - The extraction area.
   * @returns The image data.
   */
  getImageData(source: ImageSource, area?: ExtractionArea): ImageData {
    return this.#canvasRenderingMode === "2d"
      ? this.#getImageData2d(source, area)
      : this.#getImageDataWebGl2(source, area);
  }

  /**
   * Used to get the current ImageData object with the current buffer. Useful
   * when you need to get the same `ImageData` object multiple times after the
   * original `ImageData` buffer has been detached
   *
   * @returns ImageData object with the current buffer
   */
  getCurrentImageData(): ImageData {
    if (!this.#buffer) {
      throw new Error("Buffer is missing!");
    }
    return new ImageData(this.#buffer, this.#cachedWidth, this.#cachedHeight);
  }

  /**
   * Extract image data using 2D canvas.
   *
   * @param source - The source element to extract image data from.
   * @param area - The extraction area.
   * @returns The image data.
   */
  #getImageData2d(source: ImageSource, area?: ExtractionArea): ImageData {
    if (!this.#context2d)
      throw new Error("CanvasRenderingContext2D is missing!");

    const fullWidth = "videoWidth" in source ? source.videoWidth : source.width;
    const fullHeight =
      "videoHeight" in source ? source.videoHeight : source.height;

    // Use area dimensions if provided, otherwise use full dimensions
    const x = area?.x ?? 0;
    const y = area?.y ?? 0;
    const w = area?.width ?? fullWidth;
    const h = area?.height ?? fullHeight;

    // Resize canvas if source dimensions change, or if the area is different
    this.#updateCanvasSize(w, h);

    // Draw source and extract pixels
    this.#context2d.drawImage(source, x, y, w, h);
    return this.#context2d.getImageData(0, 0, w, h);
  }

  /**
   * Extract image data using WebGL2.
   *
   * @param source - The source element to extract image data from.
   * @param area - The extraction area.
   * @returns The image data.
   */
  #getImageDataWebGl2(source: ImageSource, area?: ExtractionArea): ImageData {
    if (
      !this.#contextWebGl2 ||
      !this.#webGl2Texture ||
      !this.#webGl2Framebuffer
    ) {
      throw new Error("WebGL2 context or resources are missing!");
    }

    const fullWidth = "videoWidth" in source ? source.videoWidth : source.width;
    const fullHeight =
      "videoHeight" in source ? source.videoHeight : source.height;

    // Use area dimensions if provided, otherwise use full dimensions
    const x = area?.x ?? 0;
    const y = area?.y ?? 0;
    const w = area?.width ?? fullWidth;
    const h = area?.height ?? fullHeight;

    // Resize canvas if source dimensions change, or if the area is different

    const requiredSize = w * h * 4;

    // Resize canvas if needed
    this.#updateCanvasSize(w, h);

    // Prepare buffer
    // Check for detached buffer
    if (this.isBufferDetached()) {
      throw new Error("Buffer is detached!");
    }

    // Ensure buffer size matches requirements
    if (!this.#buffer || this.#buffer.length !== requiredSize) {
      this.#buffer = new Uint8ClampedArray(requiredSize);
    }

    // Draw source to texture
    const gl = this.#contextWebGl2;
    gl.bindTexture(gl.TEXTURE_2D, this.#webGl2Texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.#webGl2Framebuffer);

    // Read pixels
    try {
      gl.pixelStorei(gl.PACK_ALIGNMENT, this.#requiredPackAlignment);
      gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, this.#buffer);
    } catch (error) {
      // Try fallback to alignment=1 if not already using it
      if (this.#requiredPackAlignment !== 1) {
        this.#requiredPackAlignment = 1;
        gl.pixelStorei(gl.PACK_ALIGNMENT, 1);

        // Create fresh buffer since the previous one may be in an undefined state
        const newBuffer = new Uint8ClampedArray(requiredSize);
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, newBuffer);

        // Use the new buffer
        this.#buffer = newBuffer;

        return new ImageData(newBuffer, w, h);
      }
      throw error;
    }

    return new ImageData(this.#buffer, w, h);
  }

  /**
   * Update canvas dimensions if needed.
   *
   * This canvas is the orientation-aware.
   *
   * @param width - The width of the canvas.
   * @param height - The height of the canvas.
   */
  #updateCanvasSize(width: number, height: number): void {
    if (this.#cachedWidth !== width || this.#cachedHeight !== height) {
      this.#canvas.width = width;
      this.#canvas.height = height;
      this.#cachedWidth = width;
      this.#cachedHeight = height;

      // Reset buffer when dimensions change
      const requiredSize = width * height * 4;

      this.#buffer = new Uint8ClampedArray(requiredSize);
    }
  }

  /**
   * Clean up resources.
   */
  dispose(): void {
    if (this.#contextWebGl2) {
      if (this.#webGl2Texture) {
        this.#contextWebGl2.deleteTexture(this.#webGl2Texture);
        this.#webGl2Texture = null;
      }
      if (this.#webGl2Framebuffer) {
        this.#contextWebGl2.deleteFramebuffer(this.#webGl2Framebuffer);
        this.#webGl2Framebuffer = null;
      }
    }
    this.#context2d = null;
    this.#contextWebGl2 = null;
    this.#buffer = null;
  }
}

/**
 * Converts a view to a buffer, since both match the type signature of
 * `ArrayBufferLike`.
 *
 * @param buffer - The buffer or view to convert
 * @returns The actual underlying buffer
 */
export const getBuffer = (buffer: ArrayBufferLike) => {
  // check if it's a view
  if (ArrayBuffer.isView(buffer)) {
    return buffer.buffer;
  } else {
    return buffer;
  }
};
