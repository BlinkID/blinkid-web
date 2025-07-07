/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import {
  BlinkIdProcessResult,
  BlinkIdScanningResult,
  loadBlinkIdCore,
  ProcessingStatus,
} from "@microblink/blinkid-core";
import { Component, createSignal, Show } from "solid-js";

type BlinkIdSession = Awaited<
  ReturnType<
    Awaited<ReturnType<typeof loadBlinkIdCore>>["createBlinkIdScanningSession"]
  >
>;

// Status check utilities
const isErrorStatus = (status: ProcessingStatus) =>
  status !== "success" && status !== "awaiting-other-side";

const isBarcodeError = (status: ProcessingStatus) =>
  status === "barcode-recognition-failed";

// Image processing utilities
const createImageData = async (file: File): Promise<ImageData> => {
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.src = url;

  try {
    await new Promise((resolve) => (img.onload = resolve));
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  } finally {
    URL.revokeObjectURL(url);
  }
};

// Session management
const initBlinkIdScanningSession = async (): Promise<BlinkIdSession> => {
  const blinkIdCore = await loadBlinkIdCore({
    licenseKey: import.meta.env.VITE_LICENCE_KEY,
  });

  return blinkIdCore.createBlinkIdScanningSession({
    inputImageSource: "photo",
  });
};

const App: Component = () => {
  const [scanningResult, setScanningResult] =
    createSignal<BlinkIdScanningResult>();

  // Process result signals
  const [frontProcessResult, setFrontProcessResult] =
    createSignal<BlinkIdProcessResult>();
  const [backProcessResult, setBackProcessResult] =
    createSignal<BlinkIdProcessResult>();
  const [barcodeProcessResult, setBarcodeProcessResult] =
    createSignal<BlinkIdProcessResult>();

  // Loading, error, success signals
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<string>();
  const [success, setSuccess] = createSignal<string>();

  // Scan state signals
  const [frontScanned, setFrontScanned] = createSignal(false);
  const [backScanned, setBackScanned] = createSignal(false);
  const [barcodeScanned, setBarcodeScanned] = createSignal(false);
  const [needsBackSide, setNeedsBackSide] = createSignal(false);
  const [needsBarcode, setNeedsBarcode] = createSignal(false);

  // Image URL signals
  const [frontImageUrl, setFrontImageUrl] = createSignal<string>();
  const [backImageUrl, setBackImageUrl] = createSignal<string>();
  const [barcodeImageUrl, setBarcodeImageUrl] = createSignal<string>();

  let session: BlinkIdSession | undefined;

  const cleanupSession = async () => {
    try {
      if (session) {
        await session.delete();
        session = undefined;
      }
    } catch (err) {
      console.error("Error cleaning up session:", err);
    }
  };

  const getResult = async () => {
    if (!session) {
      setError("No active scanning session");
      return;
    }

    try {
      setIsLoading(true);
      setError(undefined);
      setSuccess(undefined);

      const scanResult = await session.getResult();
      setScanningResult(scanResult);
      setSuccess("Document successfully scanned!");

      await cleanupSession();
      session = undefined;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get result");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      setSuccess(undefined);

      await cleanupSession();
      session = undefined;

      // Reset scan states
      setFrontScanned(false);
      setBackScanned(false);
      setBarcodeScanned(false);
      setNeedsBackSide(false);
      setNeedsBarcode(false);
      setFrontProcessResult(undefined);
      setBackProcessResult(undefined);
      setBarcodeProcessResult(undefined);
      setScanningResult(undefined);

      // Cleanup thumbnails
      if (frontImageUrl()) {
        URL.revokeObjectURL(frontImageUrl()!);
        setFrontImageUrl(undefined);
      }
      if (backImageUrl()) {
        URL.revokeObjectURL(backImageUrl()!);
        setBackImageUrl(undefined);
      }
      if (barcodeImageUrl()) {
        URL.revokeObjectURL(barcodeImageUrl()!);
        setBarcodeImageUrl(undefined);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to restart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
    event: Event,
    side: "front" | "back" | "barcode",
  ) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      setError("No file selected");
      return;
    }

    try {
      setIsLoading(true);
      setError(undefined);
      setSuccess(undefined);

      const currentSession = session ?? (await initBlinkIdScanningSession());
      session = currentSession;

      // Create thumbnail URL
      const thumbnailUrl = URL.createObjectURL(file);
      if (side === "front") {
        setFrontImageUrl(thumbnailUrl);
      } else if (side === "back") {
        setBackImageUrl(thumbnailUrl);
      } else {
        setBarcodeImageUrl(thumbnailUrl);
      }

      // Process the image
      const imageData = await createImageData(file);
      const processResult: BlinkIdProcessResult =
        await currentSession.process(imageData);

      const status = processResult.inputImageAnalysisResult.processingStatus;

      // Check for error status but allow barcode-recognition-failed only for non-barcode steps
      if (
        isErrorStatus(status) &&
        (!isBarcodeError(status) || side === "barcode")
      ) {
        throw new Error(`Processing failed: ${status}`);
      }

      if (side === "front") {
        setFrontProcessResult(processResult);
        setFrontScanned(true);
        // Check if we need back side or barcode
        const needsBack = status === "awaiting-other-side";
        const needsBarcodeStep = isBarcodeError(status);
        setNeedsBackSide(needsBack);
        setNeedsBarcode(needsBarcodeStep);

        // If we don't need back side or barcode and processing was successful, get the result
        if (!needsBack && !needsBarcodeStep && status === "success") {
          await getResult();
        }
      } else if (side === "back") {
        setBackProcessResult(processResult);
        setBackScanned(true);

        // Check if we need barcode after back side
        const needsBarcodeStep = isBarcodeError(status);
        setNeedsBarcode(needsBarcodeStep);

        // If back side was processed successfully and no barcode needed, get the result
        if (status === "success" && !needsBarcodeStep) {
          await getResult();
        }
      } else {
        // Barcode processing
        setBarcodeProcessResult(processResult);
        setBarcodeScanned(status === "success");

        // After successful barcode processing, get the result
        if (status === "success") {
          await getResult();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image");
      // Cleanup thumbnails on error
      if (side === "front") {
        if (frontImageUrl()) {
          URL.revokeObjectURL(frontImageUrl()!);
          setFrontImageUrl(undefined);
          setFrontProcessResult(undefined);
          setFrontScanned(false);
        }
      } else if (side === "back") {
        if (backImageUrl()) {
          URL.revokeObjectURL(backImageUrl()!);
          setBackImageUrl(undefined);
          setBackProcessResult(undefined);
          setBackScanned(false);
        }
      } else {
        if (barcodeImageUrl()) {
          URL.revokeObjectURL(barcodeImageUrl()!);
          setBarcodeImageUrl(undefined);
          setBarcodeProcessResult(undefined);
          setBarcodeScanned(false);
        }
      }
    } finally {
      setIsLoading(false);
      // Reset the file input value so the same file can be selected again
      input.value = "";
    }
  };

  return (
    <div class="container">
      <h1>BlinkID Photo Upload Example</h1>

      <div class="upload-section">
        <div class="side-upload">
          <h3>Front Side {frontScanned() && "✓"}</h3>
          <div class="upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => void handleFileUpload(e, "front")}
              disabled={isLoading() || frontScanned()}
            />
            <Show when={frontImageUrl()}>
              <div class="thumbnail">
                <img src={frontImageUrl()} alt="Front side" />
              </div>
            </Show>
            <Show when={frontProcessResult()}>
              <details class="process-details">
                <summary>
                  Front Side Process Result -{" "}
                  {
                    frontProcessResult()?.inputImageAnalysisResult
                      .processingStatus
                  }
                </summary>
                <pre>{JSON.stringify(frontProcessResult(), null, 2)}</pre>
              </details>
            </Show>
          </div>
        </div>

        <Show when={needsBackSide() || backScanned()}>
          <div class="side-upload">
            <h3>Back Side {backScanned() && "✓"}</h3>
            <div class="upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => void handleFileUpload(e, "back")}
                disabled={isLoading() || backScanned()}
              />
              <Show when={backImageUrl()}>
                <div class="thumbnail">
                  <img src={backImageUrl()} alt="Back side" />
                </div>
              </Show>
              <Show when={backProcessResult()}>
                <details class="process-details">
                  <summary>
                    Back Side Process Result -{" "}
                    {
                      backProcessResult()?.inputImageAnalysisResult
                        .processingStatus
                    }
                  </summary>
                  <pre>{JSON.stringify(backProcessResult(), null, 2)}</pre>
                </details>
              </Show>
            </div>
          </div>
        </Show>

        <Show when={needsBarcode() || barcodeScanned()}>
          <div class="side-upload">
            <h3>Barcode Image {barcodeScanned() && "✓"}</h3>
            <div class="upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => void handleFileUpload(e, "barcode")}
                disabled={isLoading() || barcodeScanned()}
              />
              <Show when={barcodeImageUrl()}>
                <div class="thumbnail">
                  <img src={barcodeImageUrl()} alt="Barcode" />
                </div>
              </Show>
              <Show when={barcodeProcessResult()}>
                <details class="process-details">
                  <summary>
                    Barcode Process Result -{" "}
                    {
                      barcodeProcessResult()?.inputImageAnalysisResult
                        .processingStatus
                    }
                  </summary>
                  <pre>{JSON.stringify(barcodeProcessResult(), null, 2)}</pre>
                </details>
              </Show>
            </div>
          </div>
        </Show>

        {isLoading() && <div class="processing">Processing...</div>}
        {error() && <div class="error">{error()}</div>}
        {success() && <div class="success">{success()}</div>}

        <Show when={scanningResult()}>
          <button
            class="restart-btn"
            onClick={() => void handleRestart()}
            disabled={isLoading()}
          >
            Restart
          </button>
        </Show>
      </div>

      {scanningResult() && (
        <div class="result-section">
          <h2>Scan Result:</h2>
          <pre>{JSON.stringify(scanningResult(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
