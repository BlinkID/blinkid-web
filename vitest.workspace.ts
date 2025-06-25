/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/*",
  // TODO: tries to run tests in these packages, but they don't have any
  // https://vitest.dev/guide/workspace.html#defining-a-workspace
  "!packages/blinkid",
]);
