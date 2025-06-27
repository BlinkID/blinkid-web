/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { BlinkIdUxManager } from "./BlinkIdUxManager";
import {
  BlinkIdScanningResult,
  DocumentClassInfo,
  InputImageAnalysisResult,
  ProcessingStatus,
  ProcessResultWithBuffer,
  ResultCompleteness,
  WorkerScanningSession,
} from "@microblink/blinkid-core";
import { OverrideProperties } from "type-fest";
import {
  CameraManager,
  FrameCaptureCallback,
  PlaybackState,
} from "@microblink/camera-manager";

type PartialProcessResultWithBuffer = Partial<
  OverrideProperties<
    ProcessResultWithBuffer,
    {
      inputImageAnalysisResult: Partial<InputImageAnalysisResult>;
      resultCompleteness: Partial<ResultCompleteness>;
    }
  >
>;

const createMockProcessResult = (
  processingStatus: ProcessingStatus,
  documentClassInfo?: Partial<DocumentClassInfo>,
): PartialProcessResultWithBuffer => ({
  inputImageAnalysisResult: {
    processingStatus,
    documentClassInfo: documentClassInfo as DocumentClassInfo,
    documentDetectionStatus: "success",
  },
  arrayBuffer: new ArrayBuffer(0),
  resultCompleteness: {},
});

describe("BlinkIdUxManager - Document Class Filter", () => {
  const mockCameraManager: Partial<CameraManager> & {
    addFrameCaptureCallback: ReturnType<typeof vi.fn>;
    subscribe: ReturnType<typeof vi.fn>;
    stopFrameCapture: ReturnType<typeof vi.fn>;
    startFrameCapture: ReturnType<typeof vi.fn>;
  } = {
    addFrameCaptureCallback: vi.fn(),
    subscribe: vi.fn().mockReturnValue(vi.fn()),
    stopFrameCapture: vi.fn(),
    startFrameCapture: vi.fn().mockResolvedValue(undefined),
  };

  const mockScanningSession: Partial<WorkerScanningSession> & {
    process: ReturnType<typeof vi.fn>;
    getSettings: ReturnType<typeof vi.fn>;
    showDemoOverlay: ReturnType<typeof vi.fn>;
    showProductionOverlay: ReturnType<typeof vi.fn>;
    getResult: ReturnType<typeof vi.fn>;
  } = {
    process: vi.fn(),
    getSettings: vi.fn().mockResolvedValue({ scanningSettings: {} }),
    showDemoOverlay: vi.fn().mockResolvedValue(false),
    showProductionOverlay: vi.fn().mockResolvedValue(false),
    getResult: vi.fn(),
  };

  let manager: BlinkIdUxManager;
  let frameCaptureCallback: FrameCaptureCallback;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a new manager instance for each test
    manager = new BlinkIdUxManager(
      mockCameraManager as never,
      mockScanningSession as never,
    );

    // Capture the frame capture callback
    expect(mockCameraManager.addFrameCaptureCallback).toHaveBeenCalledTimes(1);
    frameCaptureCallback =
      mockCameraManager.addFrameCaptureCallback.mock.calls[0][0];
  });

  afterEach(() => {
    manager.reset();
  });

  test("should call document filtered callback when filter returns false", async () => {
    const mockDocumentClassInfo: DocumentClassInfo = {
      country: "usa",
      type: "dl",
    };

    const mockProcessResult = createMockProcessResult(
      "success",
      mockDocumentClassInfo,
    );
    mockScanningSession.process.mockResolvedValue(mockProcessResult);

    // Add a spy for the document filtered callback
    const documentFilteredSpy = vi.fn();
    const cleanupFilteredCallback =
      manager.addOnDocumentFilteredCallback(documentFilteredSpy);

    // Add filter that rejects USA documents
    const filterCleanup = manager.addDocumentClassFilter((docInfo) => {
      return docInfo.country !== "usa";
    });

    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    // Verify callback was invoked with the document class info
    expect(documentFilteredSpy).toHaveBeenCalledWith(mockDocumentClassInfo);

    cleanupFilteredCallback();
    filterCleanup();
  });

  test("should not call document filtered callback when filter returns true", async () => {
    const mockDocumentClassInfo: DocumentClassInfo = {
      country: "usa",
      type: "dl",
    };

    const mockProcessResult = createMockProcessResult(
      "success",
      mockDocumentClassInfo,
    );
    mockScanningSession.process.mockResolvedValue(mockProcessResult);

    // Add a spy for the document filtered callback
    const documentFilteredSpy = vi.fn();
    const cleanupFilteredCallback =
      manager.addOnDocumentFilteredCallback(documentFilteredSpy);

    // Add filter that rejects USA documents
    const filterCleanup = manager.addDocumentClassFilter((docInfo) => {
      return docInfo.country === "usa";
    });

    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    // Verify callback was invoked with the document class info
    expect(documentFilteredSpy).not.toHaveBeenCalledWith(mockDocumentClassInfo);

    cleanupFilteredCallback();
    filterCleanup();
  });

  test("should not apply filter when document class info is incomplete", async () => {
    // Missing type field
    const mockDocumentClassInfo: DocumentClassInfo = {
      country: "usa",
    };

    const mockProcessResult = createMockProcessResult(
      "success",
      mockDocumentClassInfo,
    );
    mockScanningSession.process.mockResolvedValue(mockProcessResult);

    // Add filter that would reject all documents
    const filterCleanup = manager.addDocumentClassFilter(() => false);

    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    // Filter shouldn't be applied because document info is incomplete
    expect(mockProcessResult.inputImageAnalysisResult?.processingStatus).toBe(
      "success",
    );
    filterCleanup();
  });

  test("should not apply filter when documentClassInfo is undefined", async () => {
    const mockProcessResult = createMockProcessResult("success", undefined);
    mockScanningSession.process.mockResolvedValue(mockProcessResult);

    // Add filter that would reject all documents
    const filterCleanup = manager.addDocumentClassFilter(() => false);

    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    // Filter shouldn't be applied because document info is undefined
    expect(mockProcessResult.inputImageAnalysisResult?.processingStatus).toBe(
      "success",
    );
    filterCleanup();
  });

  test("should not apply filtering when no filter is added", async () => {
    const mockDocumentClassInfo: DocumentClassInfo = {
      country: "usa",
      type: "dl",
    };

    const mockProcessResult = createMockProcessResult(
      "success",
      mockDocumentClassInfo,
    );
    mockScanningSession.process.mockResolvedValue(mockProcessResult);

    // No filter added
    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    expect(mockProcessResult.inputImageAnalysisResult?.processingStatus).toBe(
      "success",
    );
  });

  test("should remove filter and not invoke callback when cleanup function is called", async () => {
    const mockDocumentClassInfo: DocumentClassInfo = {
      country: "usa",
      type: "dl",
    };

    // Add a spy for the document filtered callback
    const documentFilteredSpy = vi.fn();
    const cleanupFilteredCallback =
      manager.addOnDocumentFilteredCallback(documentFilteredSpy);

    // First run with active filter that would filter document
    const mockProcessResult = createMockProcessResult(
      "success",
      mockDocumentClassInfo,
    );
    mockScanningSession.process.mockResolvedValue(mockProcessResult);
    const filterCleanup = manager.addDocumentClassFilter(() => false);

    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    expect(documentFilteredSpy).toHaveBeenCalledTimes(1);

    // Reset spy
    documentFilteredSpy.mockClear();

    // Remove the filter and run again
    filterCleanup();

    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    // Should not invoke callback when filter is removed
    expect(documentFilteredSpy).not.toHaveBeenCalled();

    cleanupFilteredCallback();
  });

  test("should use the most recently added filter", async () => {
    const mockDocumentClassInfo: DocumentClassInfo = {
      country: "usa",
      type: "dl",
    };

    const mockProcessResult = createMockProcessResult(
      "success",
      mockDocumentClassInfo,
    );
    mockScanningSession.process.mockResolvedValue(mockProcessResult);

    // Add first filter that would reject all documents
    const firstFilterCleanup = manager.addDocumentClassFilter(() => false);

    // Add second filter that accepts all documents
    const secondFilterCleanup = manager.addDocumentClassFilter(() => true);

    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    // Second filter should take precedence
    expect(mockProcessResult.inputImageAnalysisResult?.processingStatus).toBe(
      "success",
    );

    firstFilterCleanup();
    secondFilterCleanup();
  });

  test("should stop camera capture and not emit result when document is filtered out", async () => {
    const mockDocumentClassInfo: DocumentClassInfo = {
      country: "usa",
      type: "dl",
    };

    // Mock both process result and final scanning result
    const mockProcessResult = createMockProcessResult(
      "success",
      mockDocumentClassInfo,
    );
    mockScanningSession.process.mockResolvedValue(mockProcessResult);

    // Add filter that rejects USA documents
    const filterCleanup = manager.addDocumentClassFilter(() => false);

    // Add a spy for the document filtered callback
    const documentFilteredSpy = vi.fn();
    const cleanupFilteredCallback =
      manager.addOnDocumentFilteredCallback(documentFilteredSpy);

    // Mock feedbackStabilizer to immediately return FLIP_CARD state
    const mockSideCaptured = {
      key: "FLIP_CARD",
      minDuration: 0,
    };
    const feedbackStabilizerSpy = vi
      .spyOn(manager.feedbackStabilizer, "getNewUiState")
      .mockReturnValue(mockSideCaptured as never);

    // Track results
    const resultsReceived: BlinkIdScanningResult[] = [];
    const cleanupResultListener = manager.addOnResultCallback((result) => {
      resultsReceived.push(result);
    });

    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    // Verify document filtered callback was called
    expect(documentFilteredSpy).toHaveBeenCalledWith(mockDocumentClassInfo);

    // Verify camera was stopped
    expect(mockCameraManager.stopFrameCapture).toHaveBeenCalled();

    // Verify no results were emitted
    expect(resultsReceived.length).toBe(0);
    expect(mockScanningSession.getResult).not.toHaveBeenCalled();

    cleanupResultListener();
    cleanupFilteredCallback();
    filterCleanup();
    feedbackStabilizerSpy.mockRestore();
  });
});

describe("BlinkIdUxManager - Timeout Behavior", () => {
  let manager: BlinkIdUxManager;
  let frameCaptureCallback: FrameCaptureCallback;
  let playbackStateCallback: (state: PlaybackState) => void;
  let mockCameraManager: {
    addFrameCaptureCallback: ReturnType<typeof vi.fn>;
    subscribe: ReturnType<typeof vi.fn>;
    stopFrameCapture: ReturnType<typeof vi.fn>;
    startFrameCapture: ReturnType<typeof vi.fn>;
  };

  interface TestCameraState {
    playbackState: PlaybackState;
    videoElement: HTMLVideoElement | undefined;
  }

  const mockScanningSession = {
    process: vi.fn(),
    getSettings: vi.fn().mockResolvedValue({ scanningSettings: {} }),
    showDemoOverlay: vi.fn().mockResolvedValue(false),
    showProductionOverlay: vi.fn().mockResolvedValue(false),
    getResult: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    playbackStateCallback = vi.fn();

    mockCameraManager = {
      addFrameCaptureCallback: vi.fn(),
      subscribe: vi
        .fn()
        .mockImplementationOnce(
          (
            selector: (s: TestCameraState) => PlaybackState,
            callback: (state: PlaybackState) => void,
          ) => {
            playbackStateCallback = callback;
            return vi.fn();
          },
        )
        .mockImplementationOnce(
          (
            selector: (s: TestCameraState) => HTMLVideoElement | undefined,
            callback: (el: HTMLVideoElement | undefined) => void,
          ) => {
            // For these tests, we don't need to capture the videoElement subscription callback.
            return vi.fn();
          },
        ),
      stopFrameCapture: vi.fn(),
      startFrameCapture: vi.fn().mockResolvedValue(undefined),
    };

    manager = new BlinkIdUxManager(
      mockCameraManager as never,
      mockScanningSession as never,
    );

    expect(mockCameraManager.addFrameCaptureCallback).toHaveBeenCalledTimes(1);
    frameCaptureCallback =
      mockCameraManager.addFrameCaptureCallback.mock.calls[0][0];
  });

  afterEach(() => {
    manager.reset();
    vi.useRealTimers();
  });

  test("should set timeout duration and help tooltip duration", () => {
    const timeoutDuration = 15000;
    manager.setTimeoutDuration(timeoutDuration);

    expect(manager.getTimeoutDuration()).toBe(timeoutDuration);
    expect(manager.getHelpTooltipShowDelay()).toBe(timeoutDuration / 2);
  });

  test("should set tooltip show delay and help tooltip duration", () => {
    const duration = 12000;
    manager.setHelpTooltipShowDelay(duration);
    manager.setHelpTooltipHideDelay(duration);

    expect(manager.getHelpTooltipShowDelay()).toBe(duration);
    expect(manager.getHelpTooltipHideDelay()).toBe(duration);
  });

  test("should set timeout duration without affecting help tooltip show delay", () => {
    const timeoutDuration = 15000;
    const helpTooltipShowDelay = 5000;

    manager.setHelpTooltipShowDelay(helpTooltipShowDelay);
    manager.setTimeoutDuration(timeoutDuration, false);

    expect(manager.getHelpTooltipShowDelay()).toBe(helpTooltipShowDelay);
  });

  test("should throw error when setting invalid timeout duration", () => {
    expect(() => manager.setTimeoutDuration(-1000)).toThrow();
    expect(() => manager.setTimeoutDuration(0)).toThrow();
  });

  test("should throw error when setting invalid help tooltip show delay", () => {
    expect(() => manager.setHelpTooltipShowDelay(-1000)).toThrow();
    expect(() => manager.setHelpTooltipShowDelay(0)).toThrow();
  });

  test("should throw error when setting invalid help tooltip hide delay", () => {
    expect(() => manager.setHelpTooltipHideDelay(-1000)).toThrow();
    expect(() => manager.setHelpTooltipHideDelay(0)).toThrow();
  });

  test("should allow setting null timeout duration", () => {
    expect(() => manager.setTimeoutDuration(null)).not.toThrow();
    expect(() => manager.setHelpTooltipShowDelay(null)).not.toThrow();
    expect(() => manager.setHelpTooltipHideDelay(null)).not.toThrow();
  });

  test("should trigger timeout and error callback", () => {
    const timeoutDuration = 5000;
    manager.setTimeoutDuration(timeoutDuration);

    const errorCallback = vi.fn();
    manager.addOnErrorCallback(errorCallback);

    // Simulate camera starting capture
    playbackStateCallback("capturing");

    // Advance timer to trigger timeout
    vi.advanceTimersByTime(timeoutDuration);

    expect(errorCallback).toHaveBeenCalledWith("timeout");
    expect(mockCameraManager.stopFrameCapture).toHaveBeenCalled();
  });

  test("should clear timeout when stopping capture", () => {
    const timeoutDuration = 5000;
    manager.setTimeoutDuration(timeoutDuration);

    const errorCallback = vi.fn();
    manager.addOnErrorCallback(errorCallback);

    // Simulate camera starting capture
    playbackStateCallback("capturing");

    // Simulate camera stopping capture
    playbackStateCallback("idle");

    // Advance timer past timeout duration
    vi.advanceTimersByTime(timeoutDuration + 1000);

    expect(errorCallback).not.toHaveBeenCalled();
  });

  test("should not set timeout when timeout duration is null", () => {
    manager.setTimeoutDuration(null);

    const errorCallback = vi.fn();
    manager.addOnErrorCallback(errorCallback);

    // Simulate camera starting capture
    playbackStateCallback("capturing");

    // Advance timer to trigger timeout
    vi.advanceTimersByTime(20000);

    expect(errorCallback).not.toHaveBeenCalled();
  });

  test("should reset timeout when UI state changes", async () => {
    const timeoutDuration = 5000;
    manager.setTimeoutDuration(timeoutDuration);

    const errorCallback = vi.fn();
    manager.addOnErrorCallback(errorCallback);

    // Mock process result to trigger UI state change
    const mockProcessResult = createMockProcessResult("success", {
      country: "usa",
      type: "dl",
    });
    mockScanningSession.process.mockResolvedValue(mockProcessResult);

    // Mock feedback stabilizer to return a different state
    const mockNewState = {
      key: "DOCUMENT_DETECTED",
      minDuration: 0,
    };
    const feedbackStabilizerSpy = vi
      .spyOn(manager.feedbackStabilizer, "getNewUiState")
      .mockReturnValue(mockNewState as never);

    // Simulate camera starting capture
    playbackStateCallback("capturing");

    // Process frame immediately to trigger UI state change
    await frameCaptureCallback({
      data: new Uint8ClampedArray(0),
      width: 100,
      height: 100,
      colorSpace: "srgb",
    });

    expect(errorCallback).not.toHaveBeenCalled();

    // Advance full timeout duration
    vi.advanceTimersByTime(timeoutDuration);
    expect(errorCallback).toHaveBeenCalledWith("timeout");

    feedbackStabilizerSpy.mockRestore();
  });
});
