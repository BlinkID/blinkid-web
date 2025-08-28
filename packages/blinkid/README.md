# @microblink/blinkid

The all-in-one BlinkID browser SDK package. It provides a high-level, easy-to-use API for document scanning and recognition in web applications, bundling all required components and resources for a seamless integration experience.

## Overview

- Combines the BlinkID engine, camera management, user experience (UX) management, and all required resources.
- Handles initialization, licensing, camera selection, scanning, and user feedback UI.
- Suitable for most use cases—just add your license key and start scanning!
- Used in production by leading companies for fast and accurate ID document scanning in the browser.

## What's Included

- [`@microblink/blinkid-core`](https://www.npmjs.com/package/@microblink/blinkid-core): Core scanning engine and low-level API.
- [`@microblink/blinkid-ux-manager`](https://www.npmjs.com/package/@microblink/blinkid-ux-manager): User experience and feedback UI.
- [`@microblink/camera-manager`](https://www.npmjs.com/package/@microblink/camera-manager): Camera selection and video stream management.

## Installation

Install from npm using your preferred package manager:

```sh
npm install @microblink/blinkid
# or
yarn add @microblink/blinkid
# or
pnpm add @microblink/blinkid
```

## Usage

A minimal example:

```js
import { createBlinkId } from "@microblink/blinkid";

const blinkid = await createBlinkId({
  licenseKey: import.meta.env.VITE_LICENCE_KEY,
});
```

For more advanced usage, customization, or integration with your own UI, see the example apps and the documentation for the underlying packages.

## Example Apps

Explore example applications in the GitHub repository for ready-to-run demos:

- **[blinkid-simple](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-simple)**: Minimal integration with default UI.
- **[blinkid-core-api](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-core-api)**: Low-level usage of the core API.
- **[blinkid-advanced-setup](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-advanced-setup)**: Custom UI and advanced configuration.
- **[blinkid-preload](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-preload)**: Preloading resources for faster startup.
- **[blinkid-photo-upload](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-photo-upload)**: Uploading photos example.

Each example demonstrates different integration patterns and features.

## Hosting Requirements

- Serve the `public/resources` directory as-is; it contains all required Wasm, worker, and resource files.
- Must be served in a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).
- For multithreaded builds, your site must be [cross-origin isolated](https://web.dev/articles/why-coop-coep):

  ```
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
  ```

## License Key

A valid license key is required. Request a free trial at [Microblink Developer Hub](https://account.microblink.com/signin).

## Development

To build the package locally:

1. Install dependencies in the monorepo root:

   ```sh
   pnpm install
   ```

2. Build the package:

   ```sh
   pnpm build
   ```

The output files will be available in the `dist/`, `types/`, and `public/resources/` directories.

## More Information

- [@microblink/blinkid-core](https://www.npmjs.com/package/@microblink/blinkid-core): Core API reference and advanced usage.
- [@microblink/blinkid-ux-manager](https://www.npmjs.com/package/@microblink/blinkid-ux-manager): Custom UX and feedback integration.
- [@microblink/camera-manager](https://www.npmjs.com/package/@microblink/camera-manager): Camera management details.
