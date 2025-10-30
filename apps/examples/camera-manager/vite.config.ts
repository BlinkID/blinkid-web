/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import dns from "dns";
import { ServerOptions, defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import { qrcode } from "vite-plugin-qrcode";
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/guide/migration.html#architecture-changes-and-legacy-options
dns.setDefaultResultOrder("verbatim");

const serverOptions: ServerOptions = {
  port: 3000,
};

export default defineConfig((config) => {
  return {
    build: {
      sourcemap: config.mode === "development",
      target: "es2022",
    },
    plugins: [
      qrcode(),
      solidPlugin(),
      // Generates certificates for https
      mkcert(),
    ],
    server: serverOptions,
    preview: serverOptions,
  };
});
