/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  downloadResourceBuffer,
  type DownloadProgress,
} from "./downloadResourceBuffer";
import type {
  ResourceFileType,
  WasmBuildType,
  WasmVariant,
} from "@microblink/blinkid-wasm";

// Mock sizeManifest
vi.mock("@microblink/blinkid-wasm/size-manifest.json", () => ({
  default: {
    wasm: {
      basic: {
        full: 1000,
        lightweight: 800,
      },
      advanced: {
        full: 1200,
        lightweight: 900,
      },
      "advanced-threads": {
        full: 1300,
        lightweight: 950,
      },
    },
    data: {
      basic: {
        full: 2000,
        lightweight: 1600,
      },
      advanced: {
        full: 2100,
        lightweight: 1700,
      },
      "advanced-threads": {
        full: 2200,
        lightweight: 1800,
      },
    },
  },
}));

describe("downloadResourceBuffer", () => {
  const mockUrl = "https://example.com/test.wasm";
  const mockChunks = [
    new Uint8Array([1, 2, 3, 4, 5]),
    new Uint8Array([6, 7, 8, 9, 10]),
    new Uint8Array([11, 12, 13, 14, 15]),
  ];

  // Default test parameters
  const defaultWasmFileType: ResourceFileType = "wasm";
  const defaultWasmVariant: WasmVariant = "basic";
  const defaultWasmBuildType: WasmBuildType = "full";

  // Mock Response and ReadableStream
  const createMockResponse = (options: {
    contentLength?: number;
    chunks?: Uint8Array[];
  }) => {
    const { contentLength, chunks = mockChunks } = options;

    const headers = new Headers();
    if (contentLength !== undefined) {
      headers.set("Content-Length", contentLength.toString());
    }

    const stream = new ReadableStream({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(chunk);
        }
        controller.close();
      },
    });

    return new Response(stream, { headers });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve(createMockResponse({ contentLength: 15 })),
    );
  });

  it("downloads without progress callback", async () => {
    const buffer = await downloadResourceBuffer(
      mockUrl,
      defaultWasmFileType,
      defaultWasmVariant,
      defaultWasmBuildType,
    );
    expect(fetch).toHaveBeenCalledWith(mockUrl);
    expect(buffer).toBeInstanceOf(ArrayBuffer);
  });

  it("tracks progress with Content-Length header", async () => {
    const progressCallback = vi.fn() as (progress: DownloadProgress) => void;
    const totalSize = 15; // Sum of all chunk lengths

    await downloadResourceBuffer(
      mockUrl,
      defaultWasmFileType,
      defaultWasmVariant,
      defaultWasmBuildType,
      progressCallback,
    );

    // Should have been called for each chunk plus final completion
    expect(progressCallback).toHaveBeenCalledTimes(4);

    // Verify progress calculations
    expect(progressCallback).toHaveBeenNthCalledWith(1, {
      loaded: 5,
      contentLength: totalSize,
      progress: 33,
      finished: false,
    });
    expect(progressCallback).toHaveBeenNthCalledWith(2, {
      loaded: 10,
      contentLength: totalSize,
      progress: 67,
      finished: false,
    });
    expect(progressCallback).toHaveBeenNthCalledWith(3, {
      loaded: 15,
      contentLength: totalSize,
      progress: 100,
      finished: false,
    });
    expect(progressCallback).toHaveBeenNthCalledWith(4, {
      loaded: 15,
      contentLength: totalSize,
      progress: 100,
      finished: true,
    });
  });

  it("uses expected file size when Content-Length is missing", async () => {
    vi.mocked(fetch).mockImplementation(() =>
      Promise.resolve(createMockResponse({ contentLength: undefined })),
    );

    const progressCallback = vi.fn() as (progress: DownloadProgress) => void;
    await downloadResourceBuffer(
      mockUrl,
      defaultWasmFileType,
      defaultWasmVariant,
      defaultWasmBuildType,
      progressCallback,
    );

    // Verify progress uses expected file size from wasmSizes (1000)
    expect(progressCallback).toHaveBeenNthCalledWith(1, {
      loaded: 5,
      contentLength: 1000,
      progress: 1,
      finished: false,
    });
  });

  it("throws error for invalid content length", async () => {
    vi.mocked(fetch).mockImplementation(() => {
      const response = createMockResponse({ contentLength: undefined });
      // Mock wasmSizes to return an invalid size
      response.headers.set("Content-Length", "0");
      return Promise.resolve(response);
    });

    const progressCallback = vi.fn() as (progress: DownloadProgress) => void;

    await expect(
      downloadResourceBuffer(
        mockUrl,
        defaultWasmFileType,
        defaultWasmVariant,
        defaultWasmBuildType,
        progressCallback,
      ),
    ).rejects.toThrow("Invalid content length");
  });

  it("handles empty response", async () => {
    vi.mocked(fetch).mockImplementation(() =>
      Promise.resolve(createMockResponse({ chunks: [] })),
    );

    const progressCallback = vi.fn() as (progress: DownloadProgress) => void;
    await downloadResourceBuffer(
      mockUrl,
      defaultWasmFileType,
      defaultWasmVariant,
      defaultWasmBuildType,
      progressCallback,
    );

    // Should only be called once with completion
    expect(progressCallback).toHaveBeenCalledTimes(1);
    expect(progressCallback).toHaveBeenCalledWith({
      loaded: 0,
      contentLength: 1000, // fallback to expected size
      progress: 100,
      finished: true,
    });
  });

  it("handles network errors", async () => {
    vi.mocked(fetch).mockImplementation(() =>
      Promise.reject(new Error("Network error")),
    );

    await expect(
      downloadResourceBuffer(
        mockUrl,
        defaultWasmFileType,
        defaultWasmVariant,
        defaultWasmBuildType,
      ),
    ).rejects.toThrow("Network error");
  });
});
