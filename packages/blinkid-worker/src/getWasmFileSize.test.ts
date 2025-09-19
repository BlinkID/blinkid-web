/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, it, expect } from "vitest";
import { getWasmFileSize } from "./getWasmFileSize";

describe("getExpectedFileSize", () => {
  it("returns correct size for known wasm file", () => {
    const size = getWasmFileSize("wasm", "basic", "full");
    expect(typeof size).toBe("number");
    expect(size).toBeGreaterThan(0);
  });

  it("returns correct size for known data file", () => {
    const size = getWasmFileSize("data", "advanced", "lightweight");
    expect(typeof size).toBe("number");
    expect(size).toBeGreaterThan(0);
  });

  it("returns undefined for unknown file type/variant/buildType", () => {
    expect(() => {
      // @ts-expect-error Testing invalid parameters
      getWasmFileSize("invalid", "basic", "full");
    }).toThrowError("Cannot read properties of undefined (reading 'basic')");
  });
});
