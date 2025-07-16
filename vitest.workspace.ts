/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/*",
  // TODO: ignore blinkid package because it doesn't have any tests at the moment
  // https://vitest.dev/guide/workspace.html#defining-a-workspace
  "!packages/blinkid",
]);
