/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { expose, finalizer, proxy, ProxyMarked, transfer } from "comlink";
import { detectWasmFeatures, WasmVariant } from "./wasm-feature-detect";

import {
  BlinkIdProcessResult,
  BlinkIdScanningSession,
  BlinkIdSessionSettings,
  BlinkIdWasmModule,
  EmscriptenModuleFactory,
} from "@microblink/blinkid-wasm";
import { OverrideProperties } from "type-fest";
import { getCrossOriginWorkerURL } from "./getCrossOriginWorkerURL";
import { isIOS } from "./isSafari";
import { obtainNewServerPermission } from "./licencing";
import { mbToWasmPages } from "./mbToWasmPages";

import { downloadArrayBuffer, DownloadProgress } from "./downloadArrayBuffer";
import { buildResourcePath } from "./buildResourcePath";
import {
  buildSessionSettings,
  PartialBlinkIdSessionSettings,
} from "./buildSessionSettings";
// might be needed for types to work

import type {
  BlinkIdScanningResult,
  BlinkIdSessionError,
  LicenseTokenState,
} from "@microblink/blinkid-wasm";

/**
 * This is a workaround for the fact that the types are not exported.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface _BlinkIdScanningResult extends BlinkIdScanningResult {}

/**
 * This is a workaround for the fact that the types are not exported.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface _BlinkIdSessionError extends BlinkIdSessionError {}

/**
 * The process result with buffer.
 */
export type ProcessResultWithBuffer = BlinkIdProcessResult & {
  arrayBuffer: ArrayBuffer;
};

/**
 * The worker scanning session.
 */
export type WorkerScanningSession = OverrideProperties<
  BlinkIdScanningSession,
  {
    process: (image: ImageData) => ProcessResultWithBuffer;
  }
> & {
  /**
   * Gets the settings.
   *
   * @returns The settings.
   */
  getSettings: () => BlinkIdSessionSettings;
  /**
   * Shows the demo overlay.
   *
   * @returns Whether the demo overlay is shown.
   */
  showDemoOverlay: () => boolean;
  /**
   * Shows the production overlay.
   *
   * @returns Whether the production overlay is shown.
   */
  showProductionOverlay: () => boolean;
};

/**
 * Initialization settings for the BlinkID worker.
 *
 * These settings control how the BlinkID worker is initialized and configured,
 * including resource locations, memory allocation, and build variants.
 */
export type BlinkIdWorkerInitSettings = {
  /**
   * The license key required to unlock and use the BlinkID SDK.
   * This must be a valid license key obtained from Microblink.
   */
  licenseKey: string;

  /**
   * The URL of the Microblink proxy server. This proxy handles requests to Microblink's Baltazar and Ping servers.
   *
   * **Requirements:**
   * - Must be a valid HTTPS URL
   * - The proxy server must implement the expected Microblink API endpoints
   * - This feature is only available if explicitly permitted by your license
   *
   * **Endpoints:**
   * - Ping: `{proxyUrl}/ping`
   * - Baltazar: `{proxyUrl}/api/v2/status/check`
   *
   * @example "https://your-proxy.example.com"
   */
  microblinkProxyUrl?: string;

  /**
   * The parent directory where the `/resources` directory is hosted.
   * Defaults to `window.location.href`, at the root of the current page.
   */
  resourcesLocation?: string;

  /**
   * A unique identifier for the user/session.
   * Used for analytics and tracking purposes.
   */
  userId: string;

  /**
   * The WebAssembly module variant to use.
   * Different variants may offer different performance/size tradeoffs.
   */
  wasmVariant?: WasmVariant;

  /**
   * The initial memory allocation for the Wasm module, in megabytes.
   * Larger values may improve performance but increase memory usage.
   */
  initialMemory?: number;

  /**
   * Whether to use the lightweight build of the SDK.
   * Lightweight builds have reduced size but may have limited functionality.
   */
  useLightweightBuild: boolean;
};

/**
 * The load Wasm params.
 */
export type LoadWasmParams = {
  resourceUrl: string;
  variant?: WasmVariant;
  useLightweightBuild: boolean;
  initialMemory?: number;
};

/**
 * The progress status callback.
 */
export type ProgressStatusCallback = (progress: DownloadProgress) => void;

/**
 * Sanitized proxy URLs for different Microblink services.
 */
type SanitizedProxyUrls = {
  /**
   * URL for ping service.
   */
  ping: string;
  /**
   * URL for Baltazar service.
   */
  baltazar: string;
};

/**
 * Error thrown when proxy URL validation fails
 */
export class ProxyUrlValidationError extends Error {
  constructor(
    message: string,
    public readonly url: string,
  ) {
    super(`Proxy URL validation failed for "${url}": ${message}`);
    this.name = "ProxyUrlValidationError";
  }
}

export type LicenseErrorCode = "LICENSE_ERROR";

/**
 * Error thrown when license unlock fails
 */
export class LicenseError extends Error {
  code: LicenseErrorCode;

  constructor(message: string, code: LicenseErrorCode) {
    super(message);
    this.name = "LicenseError";
    this.code = code;
  }
}

/**
 * The BlinkID worker.
 */
class BlinkIdWorker {
  /**
   * The Wasm module.
   */
  #wasmModule?: BlinkIdWasmModule;
  /**
   * The default session settings.
   *
   * Must be initialized when calling initBlinkId.
   */
  #defaultSessionSettings!: BlinkIdSessionSettings;
  /**
   * The progress status callback.
   */
  progressStatusCallback?: ProgressStatusCallback;
  /**
   * Whether the demo overlay is shown.
   */
  #showDemoOverlay = true;
  /**
   * Whether the production overlay is shown.
   */
  #showProductionOverlay = true;

  /**
   * Sanitized proxy URLs for Microblink services.
   */
  #proxyUrls?: SanitizedProxyUrls;

  /**
   * This method loads the Wasm module.
   */
  async #loadWasm({
    resourceUrl,
    variant,
    useLightweightBuild,
    initialMemory,
  }: LoadWasmParams) {
    if (this.#wasmModule) {
      console.log("Wasm already loaded");
      return;
    }

    const wasmVariant = variant ?? (await detectWasmFeatures());

    const featureVariant = useLightweightBuild ? "lightweight" : "full";

    const MODULE_NAME = "BlinkIdModule";

    const variantUrl = buildResourcePath(
      resourceUrl,
      featureVariant,
      wasmVariant,
    );

    const workerUrl = buildResourcePath(variantUrl, `${MODULE_NAME}.js`);
    const wasmUrl = buildResourcePath(variantUrl, `${MODULE_NAME}.wasm`);
    const dataUrl = buildResourcePath(variantUrl, `${MODULE_NAME}.data`);

    const crossOriginWorkerUrl = await getCrossOriginWorkerURL(workerUrl);

    const imported = (await import(
      /* @vite-ignore */ crossOriginWorkerUrl
    )) as {
      default: EmscriptenModuleFactory<BlinkIdWasmModule>;
    };

    const createModule = imported.default;

    // use default memory settings if not provided
    if (!initialMemory) {
      // safari requires a larger initial memory allocation as it often block memory growth
      initialMemory = isIOS() ? 700 : 200;
    }

    const wasmMemory = new WebAssembly.Memory({
      initial: mbToWasmPages(initialMemory),
      maximum: mbToWasmPages(2048),
      shared: wasmVariant === "advanced-threads",
    });

    // Create progress trackers for each download
    let wasmProgress: DownloadProgress | undefined;
    let dataProgress: DownloadProgress | undefined;

    let lastProgressUpdate = 0;
    const progressUpdateInterval = 32; // 32ms interval ~ 30fps

    // Update the overall combined progress based on both downloads
    // Throttle to avoid updating too frequently
    const throttledCombinedProgress = () => {
      // Don't update progress if the callback is not set
      if (!this.progressStatusCallback) {
        return;
      }

      // wait until both have started so that we know the total length
      if (!wasmProgress || !dataProgress) {
        return;
      }

      const totalLoaded = wasmProgress.loaded + dataProgress.loaded;
      const totalLength =
        wasmProgress.contentLength + dataProgress.contentLength;
      const combinedPercent = Math.min(
        Math.round((totalLoaded / totalLength) * 100),
        100,
      );

      const combinedProgress: DownloadProgress = {
        loaded: totalLoaded,
        contentLength: totalLength,
        progress: combinedPercent,
      };

      // Check if enough time has elapsed since the last update
      const currentTime = performance.now();
      if (currentTime - lastProgressUpdate < progressUpdateInterval) {
        return;
      }

      // Update the timestamp
      lastProgressUpdate = currentTime;

      this.progressStatusCallback(combinedProgress);
    };

    // Wrap each download's progress callback to update the combined progress.
    const wasmProgressCallback = (progress: DownloadProgress) => {
      wasmProgress = progress;
      void throttledCombinedProgress();
    };

    const dataProgressCallback = (progress: DownloadProgress) => {
      dataProgress = progress;
      void throttledCombinedProgress();
    };

    // Replace simple fetch with progress tracking for both wasm and data downloads
    const [preloadedWasm, preloadedData] = await Promise.all([
      downloadArrayBuffer(wasmUrl, wasmProgressCallback),
      downloadArrayBuffer(dataUrl, dataProgressCallback),
    ]);

    // Ensure final 100% progress update is sent
    if (this.progressStatusCallback && wasmProgress && dataProgress) {
      const totalLength =
        wasmProgress.contentLength + dataProgress.contentLength;
      this.progressStatusCallback({
        loaded: totalLength,
        contentLength: totalLength,
        progress: 100,
      });
    }

    /**
     * https://emscripten.org/docs/api_reference/module.html#module-object
     */
    this.#wasmModule = await createModule({
      locateFile: (path) => {
        return `${variantUrl}/${wasmVariant}/${path}`;
      },
      // pthreads build breaks without this:
      // "Failed to execute 'createObjectURL' on 'URL': Overload resolution failed."
      mainScriptUrlOrBlob: crossOriginWorkerUrl,
      wasmBinary: preloadedWasm,
      getPreloadedPackage() {
        return preloadedData;
      },
      wasmMemory,
      noExitRuntime: true,
    });

    if (!this.#wasmModule) {
      throw new Error("Failed to load Wasm module");
    }
  }

  /**
   * This method initializes everything.
   */
  async initBlinkId(
    settings: BlinkIdWorkerInitSettings,
    defaultSessionSettings: BlinkIdSessionSettings,
    progressCallback?: ProgressStatusCallback,
  ) {
    const resourcesPath = new URL(
      "resources/",
      settings.resourcesLocation,
    ).toString();

    this.#defaultSessionSettings = defaultSessionSettings;
    this.progressStatusCallback = progressCallback;

    await this.#loadWasm({
      resourceUrl: resourcesPath,
      variant: settings.wasmVariant,
      initialMemory: settings.initialMemory,
      useLightweightBuild: settings.useLightweightBuild,
    });

    if (!this.#wasmModule) {
      throw new Error("Wasm module not loaded");
    }

    // Initialize with license key
    const licenceUnlockResult = this.#wasmModule.initializeWithLicenseKey(
      settings.licenseKey,
      settings.userId,
      false,
    );

    if (licenceUnlockResult.licenseError) {
      throw new LicenseError(
        "License unlock error: " + licenceUnlockResult.licenseError,
        "LICENSE_ERROR",
      );
    }

    // Handle proxy URL configuration
    if (settings.microblinkProxyUrl) {
      this.#configureProxyUrls(
        settings.microblinkProxyUrl,
        licenceUnlockResult,
      );
    }

    // Check if we need to obtain a server permission
    if (licenceUnlockResult.unlockResult === "requires-server-permission") {
      // Use proxy URL if configured, otherwise use default
      const baltazarUrl = this.#proxyUrls?.baltazar;

      const serverPermissionResponse =
        baltazarUrl && licenceUnlockResult.allowBaltazarProxy
          ? await obtainNewServerPermission(licenceUnlockResult, baltazarUrl)
          : await obtainNewServerPermission(licenceUnlockResult);

      const serverPermissionResult = this.#wasmModule.submitServerPermission(
        JSON.stringify(serverPermissionResponse),
      );

      if (serverPermissionResult.error) {
        throw new Error("Server unlock error: " + serverPermissionResult.error);
      }
    }

    this.#showDemoOverlay = licenceUnlockResult.showDemoOverlay;
    this.#showProductionOverlay = licenceUnlockResult.showProductionOverlay;
  }

  /**
   * This method creates a BlinkID scanning session.
   *
   * @param options - The options for the session.
   * @returns The session.
   */
  createBlinkIdScanningSession(options?: PartialBlinkIdSessionSettings) {
    if (!this.#wasmModule) {
      throw new Error("Wasm module not loaded");
    }

    const sessionSettings = buildSessionSettings(
      options,
      this.#defaultSessionSettings,
    );

    const session =
      this.#wasmModule.createBlinkIdScanningSession(sessionSettings);

    const proxySession = this.createProxySession(session, sessionSettings);
    return proxySession;
  }

  /**
   * This method creates a proxy session.
   *
   * @param session - The session.
   * @param sessionSettings - The session settings.
   * @returns The proxy session.
   */
  createProxySession(
    session: BlinkIdScanningSession,
    sessionSettings: BlinkIdSessionSettings,
  ): WorkerScanningSession & ProxyMarked {
    /**
     * this is a custom session that will be proxied
     * it handles the transfer of the image data buffer
     */
    const customSession: WorkerScanningSession = {
      getResult: () => session.getResult(),
      process: (image) => {
        const processResult = session.process(image);

        if ("error" in processResult) {
          throw new Error(`Error processing frame: ${processResult.error}`);
        }

        const transferPackage: ProcessResultWithBuffer = transfer(
          {
            ...processResult,
            arrayBuffer: image.data.buffer,
          },
          [image.data.buffer],
        );

        return transferPackage;
      },
      getSettings: () => sessionSettings,
      reset: () => session.reset(),
      delete: () => session.delete(),
      deleteLater: () => session.deleteLater(),
      isDeleted: () => session.isDeleted(),
      isAliasOf: (other) => session.isAliasOf(other),
      showDemoOverlay: () => this.#showDemoOverlay,
      showProductionOverlay: () => this.#showProductionOverlay,
    };

    return proxy(customSession);
  }

  /**
   * This method is called when the worker is terminated.
   */
  [finalizer]() {
    // console.log("Comlink.finalizer called on proxyWorker");
    // Can't use this as the `proxyWorker` gets randomly GC'd, even if in use
    // self.close();
  }

  /**
   * Terminates the workers and the Wasm runtime.
   */
  terminate() {
    self.close();
  }

  /**
   * If the ping is enabled, this method will return 1.
   *
   * @returns 1 if the ping is enabled, 0 otherwise.
   */
  ping() {
    return 1;
  }

  /**
   * Configures proxy URLs based on the provided settings and license permissions.
   */
  #configureProxyUrls(
    proxyUrl: string,
    licenceUnlockResult: {
      allowPingProxy: boolean;
      allowBaltazarProxy: boolean;
      hasPing: boolean;
      unlockResult: LicenseTokenState;
    },
  ): void {
    if (!proxyUrl) {
      console.debug(
        "No proxy URL configured, using default Microblink servers",
      );
      return;
    }

    // Validate license permissions
    this.#validateProxyPermissions(licenceUnlockResult, proxyUrl);

    // Validate and sanitize the proxy URL
    try {
      this.#proxyUrls = this.#sanitizeProxyUrls(proxyUrl);

      if (licenceUnlockResult.allowPingProxy) {
        // Configure the WASM module with the sanitized URLs
        this.#wasmModule!.setPingProxyUrl(this.#proxyUrls.ping);
      }

      console.debug("Proxy URLs configured successfully:", {
        ping: this.#proxyUrls.ping,
        baltazar: this.#proxyUrls.baltazar,
      });
    } catch (error) {
      // Enhance error message with actionable advice
      const enhancedError =
        error instanceof ProxyUrlValidationError
          ? new Error(
              `${error.message}\n\nTroubleshooting:\n- Ensure the URL is accessible\n- Check HTTPS requirements\n- Verify proxy server implementation`,
            )
          : error;

      throw enhancedError;
    }
  }

  /**
   * Validates that the license allows proxy usage.
   */
  #validateProxyPermissions(
    licenceUnlockResult: {
      allowPingProxy: boolean;
      allowBaltazarProxy: boolean;
      hasPing: boolean;
      unlockResult: LicenseTokenState;
    },
    proxyUrl: string,
  ): void {
    if (
      !licenceUnlockResult.allowPingProxy &&
      !licenceUnlockResult.allowBaltazarProxy
    ) {
      throw new Error(
        `Proxy URL "${proxyUrl}" was provided, but your license does not permit proxy usage.\n` +
          `License permissions: pingProxy=${licenceUnlockResult.allowPingProxy}, ` +
          `baltazarProxy=${licenceUnlockResult.allowBaltazarProxy}\n` +
          `Check your license.`,
      );
    } else if (
      !licenceUnlockResult.hasPing &&
      licenceUnlockResult.unlockResult !== "requires-server-permission"
    ) {
      throw new Error(
        `Microblink proxy URL is set but cannot be used because ping and online license check are disabled in your license.\n` +
          `Check your license.`,
      );
    }
  }

  /**
   * Validates and sanitizes proxy URLs for different Microblink services.
   */
  #sanitizeProxyUrls(baseUrl: string): SanitizedProxyUrls {
    // Validate base URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(baseUrl);
    } catch (error) {
      throw new ProxyUrlValidationError(
        `Failed to create URL instance for provided Microblink proxy URL "${baseUrl}". Expected format: https://your-proxy.com or https://your-proxy.com/`,
        baseUrl,
      );
    }

    // Security validation: Ensure HTTPS in production
    if (parsedUrl.protocol !== "https:") {
      throw new ProxyUrlValidationError(
        `Proxy URL validation failed for "${baseUrl}": HTTPS protocol must be used. Expected format: https://your-proxy.com or https://your-proxy.com/`,
        baseUrl,
      );
    }

    // Create sanitized URLs for each service
    const baseUrlStr = parsedUrl.origin;

    const baltazarUrl = this.#buildServiceUrl(
      baseUrlStr,
      "/api/v2/status/check",
    );

    return {
      ping: baseUrlStr,
      baltazar: baltazarUrl,
    };
  }

  /**
   * Builds a service URL by combining base URL with service path.
   */
  #buildServiceUrl(baseUrl: string, servicePath: string): string {
    try {
      const url = new URL(servicePath, baseUrl);
      return url.toString();
    } catch (error) {
      throw new ProxyUrlValidationError(
        `Failed to build service URL for path "${servicePath}"`,
        baseUrl,
      );
    }
  }
}

/**
 * The BlinkID worker.
 */
const blinkIdWorker = new BlinkIdWorker();

/**
 * The BlinkID worker proxy.
 */
expose(blinkIdWorker);

/**
 * The BlinkID worker proxy.
 */
export type BlinkIdWorkerProxy = Omit<BlinkIdWorker, typeof finalizer>;
