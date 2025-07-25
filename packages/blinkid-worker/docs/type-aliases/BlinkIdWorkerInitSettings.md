[**@microblink/blinkid-worker**](../README.md)

***

[@microblink/blinkid-worker](../README.md) / BlinkIdWorkerInitSettings

# Type Alias: BlinkIdWorkerInitSettings

> **BlinkIdWorkerInitSettings** = `object`

Initialization settings for the BlinkID worker.

These settings control how the BlinkID worker is initialized and configured,
including resource locations, memory allocation, and build variants.

## Properties

### initialMemory?

> `optional` **initialMemory**: `number`

The initial memory allocation for the Wasm module, in megabytes.
Larger values may improve performance but increase memory usage.

***

### licenseKey

> **licenseKey**: `string`

The license key required to unlock and use the BlinkID SDK.
This must be a valid license key obtained from Microblink.

***

### microblinkProxyUrl?

> `optional` **microblinkProxyUrl**: `string`

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
"https://your-proxy.example.com"
```

***

### resourcesLocation?

> `optional` **resourcesLocation**: `string`

The parent directory where the `/resources` directory is hosted.
Defaults to `window.location.href`, at the root of the current page.

***

### useLightweightBuild

> **useLightweightBuild**: `boolean`

Whether to use the lightweight build of the SDK.
Lightweight builds have reduced size but may have limited functionality.

***

### userId

> **userId**: `string`

A unique identifier for the user/session.
Used for analytics and tracking purposes.

***

### wasmVariant?

> `optional` **wasmVariant**: `WasmVariant`

The WebAssembly module variant to use.
Different variants may offer different performance/size tradeoffs.
