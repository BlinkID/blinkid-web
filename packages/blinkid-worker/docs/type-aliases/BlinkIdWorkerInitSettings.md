[**@microblink/blinkid-worker**](../README.md)

---

[@microblink/blinkid-worker](../README.md) / BlinkIdWorkerInitSettings

# Type Alias: BlinkIdWorkerInitSettings

> **BlinkIdWorkerInitSettings** = `object`

Defined in: [BlinkIdWorker.ts:89](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-worker/src/BlinkIdWorker.ts)

Initialization settings for the BlinkID worker.

These settings control how the BlinkID worker is initialized and configured,
including resource locations, memory allocation, and build variants.

## Properties

### initialMemory?

> `optional` **initialMemory**: `number`

Defined in: [BlinkIdWorker.ts:134](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-worker/src/BlinkIdWorker.ts)

The initial memory allocation for the Wasm module, in megabytes.
Larger values may improve performance but increase memory usage.

---

### licenseKey

> **licenseKey**: `string`

Defined in: [BlinkIdWorker.ts:94](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-worker/src/BlinkIdWorker.ts)

The license key required to unlock and use the BlinkID SDK.
This must be a valid license key obtained from Microblink.

---

### microblinkProxyUrl?

> `optional` **microblinkProxyUrl**: `string`

Defined in: [BlinkIdWorker.ts:110](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-worker/src/BlinkIdWorker.ts)

The URL of the Microblink proxy server. This proxy handles requests to Microblink's Baltazar and Ping servers.

**Requirements:**

- Must be a valid HTTPS URL
- The proxy server must implement the expected Microblink API endpoints
- This feature is only available if explicitly permitted by your license

**Endpoints:**

- Ping: `{proxyUrl}/ping`
- Baltazar: `{proxyUrl}/api/v2/status/check`

#### Example

```ts
"https://your-proxy.example.com";
```

---

### resourcesLocation?

> `optional` **resourcesLocation**: `string`

Defined in: [BlinkIdWorker.ts:116](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-worker/src/BlinkIdWorker.ts)

The parent directory where the `/resources` directory is hosted.
Defaults to `window.location.href`, at the root of the current page.

---

### useLightweightBuild

> **useLightweightBuild**: `boolean`

Defined in: [BlinkIdWorker.ts:140](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-worker/src/BlinkIdWorker.ts)

Whether to use the lightweight build of the SDK.
Lightweight builds have reduced size but may have limited functionality.

---

### userId

> **userId**: `string`

Defined in: [BlinkIdWorker.ts:122](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-worker/src/BlinkIdWorker.ts)

A unique identifier for the user/session.
Used for analytics and tracking purposes.

---

### wasmVariant?

> `optional` **wasmVariant**: `WasmVariant`

Defined in: [BlinkIdWorker.ts:128](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-worker/src/BlinkIdWorker.ts)

The WebAssembly module variant to use.
Different variants may offer different performance/size tradeoffs.
