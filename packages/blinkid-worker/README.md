# @microblink/blinkid-worker

This package provides the Web Worker script for the BlinkID browser SDK. It is used internally by BlinkID to offload intensive document scanning and recognition tasks to a separate thread, improving performance and responsiveness in web applications.

## Overview

- Contains the worker code that interacts with the BlinkID WebAssembly module.
- Used by higher-level packages such as [`@microblink/blinkid-core`](https://www.npmjs.com/package/@microblink/blinkid-core) and [`@microblink/blinkid`](https://www.npmjs.com/package/@microblink/blinkid).
- Not intended for direct use by end-users.

## Usage

This package is bundled and distributed as part of the BlinkID browser SDK. If you want to use BlinkID in your project, install and use:

- [`@microblink/blinkid`](https://www.npmjs.com/package/@microblink/blinkid)
- [`@microblink/blinkid-core`](https://www.npmjs.com/package/@microblink/blinkid-core)

## Development

To build the worker locally:

1. Install dependencies in the monorepo root:

   ```sh
   pnpm install
   ```

2. Build the package:

   ```sh
   pnpm build
   ```

The output files will be available in the `dist/` directory.
