/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: [path.resolve(__dirname, "vitest.setup.ts")],
  },
});
