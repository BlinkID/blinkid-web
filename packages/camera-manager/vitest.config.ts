/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/// <reference types="@vitest/browser/providers/playwright" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: "playwright",
      screenshotFailures: false,
      headless: true,
      instances: [
        {
          browser: "chromium",
          // Doesn't work:
          // headless: false,
        },
      ],
    },
  },
});
