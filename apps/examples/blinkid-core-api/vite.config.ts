/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { moveResources } from "@microblink/utils";
import dns from "dns";
import { defineConfig, Plugin, ServerOptions } from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/guide/migration.html#architecture-changes-and-legacy-options
dns.setDefaultResultOrder("verbatim");

let ranOnce = false;

const serverOptions: ServerOptions = {
  port: 3000,
  headers: {
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
  },
  host: true,
};

// Custom plugin to add resource-specific headers
const resourceHeadersPlugin: Plugin = {
  name: "resource-headers-plugin",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.includes("/resources/")) {
        res.setHeader("Cache-Control", "max-age=300");
        res.setHeader("Access-Control-Allow-Origin", "*");
      }
      next();
    });
  },
};

export default defineConfig((config) => {
  return {
    build: {
      sourcemap: config.mode === "development",
      target: "es2022",
    },
    plugins: [
      // symlink wasm resources to public/resources
      {
        name: "move-resources",
        buildStart: async () => {
          if (ranOnce) {
            return;
          }
          moveResources("@microblink/blinkid-core", "public/resources");
          ranOnce = true;
        },
      },
      // Add resource-specific headers
      resourceHeadersPlugin,
      // Generates certificates for https
      mkcert(),
    ],
    server: serverOptions,
    preview: serverOptions,
  };
});
