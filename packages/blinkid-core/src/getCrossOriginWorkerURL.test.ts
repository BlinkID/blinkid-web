/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { vi, describe, it, expect, beforeEach, afterEach, Mock } from "vitest";
import { getCrossOriginWorkerURL } from "./getCrossOriginWorkerURL";

const createObjectURLMock = vi.fn((blob: Blob) => `blob:${blob.size}`);
globalThis.URL.createObjectURL = createObjectURLMock;

globalThis.fetch = vi.fn();

describe("getCrossOriginWorkerURL", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    vi.stubGlobal("self", {
      location: {
        origin: "http://same-origin.com",
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return the original URL for same-origin requests by default", async () => {
    const workerUrl = "http://same-origin.com/worker.js";
    const result = await getCrossOriginWorkerURL(workerUrl);
    expect(result).toBe(workerUrl);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("should fetch and create a blob URL for same-origin requests when skipSameOrigin is false", async () => {
    const workerUrl = "http://same-origin.com/worker.js";
    const workerCode = "console.log('hello')";
    (globalThis.fetch as Mock).mockResolvedValueOnce(
      new Response(workerCode, { status: 200 }),
    );

    const result = await getCrossOriginWorkerURL(workerUrl, {
      skipSameOrigin: false,
    });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      workerUrl,
      expect.any(Object),
    );
    expect(result).toMatch(/^blob:/);
    expect(createObjectURLMock).toHaveBeenCalled();
  });

  it("should fetch and create a blob URL for cross-origin requests", async () => {
    const workerUrl = "http://another-domain.com/worker.js";
    const workerCode = "console.log('worker')";
    (globalThis.fetch as Mock).mockResolvedValueOnce(
      new Response(workerCode, { status: 200 }),
    );

    const result = await getCrossOriginWorkerURL(workerUrl);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      workerUrl,
      expect.any(Object),
    );
    expect(result).toMatch(/^blob:/);
    expect(createObjectURLMock).toHaveBeenCalled();
  });

  it("should create a data URL when useBlob is false", async () => {
    const workerUrl = "http://another-domain.com/worker.js";
    const workerCode = "console.log('worker')";
    (globalThis.fetch as Mock).mockResolvedValueOnce(
      new Response(workerCode, { status: 200 }),
    );

    const result = await getCrossOriginWorkerURL(workerUrl, { useBlob: false });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      workerUrl,
      expect.any(Object),
    );
    expect(result).toBe(
      `data:application/javascript,${encodeURIComponent(workerCode)}`,
    );
    expect(createObjectURLMock).not.toHaveBeenCalled();
  });

  it("should reject if fetch fails", async () => {
    const workerUrl = "http://another-domain.com/worker.js";
    (globalThis.fetch as Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    await expect(getCrossOriginWorkerURL(workerUrl)).rejects.toThrow(
      `Failed to fetch worker from ${workerUrl}`,
    );
  });

  it("should time out and reject if fetch takes too long", async () => {
    const workerUrl = "http://another-domain.com/worker.js";
    (globalThis.fetch as Mock).mockImplementationOnce(
      (_url: string, { signal }: RequestInit) => {
        return new Promise((_resolve, reject) => {
          signal?.addEventListener("abort", () => {
            reject(
              new DOMException("The operation was aborted.", "AbortError"),
            );
          });
        });
      },
    );

    const promise = getCrossOriginWorkerURL(workerUrl);

    void vi.runAllTimersAsync();

    await expect(promise).rejects.toThrow(
      `Failed to fetch worker from ${workerUrl}`,
    );
  });
});
