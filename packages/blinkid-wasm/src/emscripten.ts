/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

// emscripten-types.ts

/**
 * The WebAssembly module, for compatibility.
 *
 * @ignore
 */
export interface WebAssemblyModule {}

/**
 * The environment type.
 *
 * @ignore
 */
export type EnvironmentType = "WEB" | "NODE" | "SHELL" | "WORKER";

/**
 * Options for a C call.
 *
 * @ignore
 */
export interface CCallOpts {
  async?: boolean | undefined;
}

/**
 * Specifies an abstract object placed on the WebAssembly heap. Objects placed
 * on the WebAssembly heap are not cleaned up by the garbage collector of the
 * JavaScript engine. The memory used by the object must be cleaned up manually
 * by calling the delete() method.
 *
 * @see https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management for more details.
 *
 * @ignore
 */
export type EmbindObject<T extends {}> = T & {
  delete: () => void;
  isDeleted: () => boolean;
  deleteLater: () => void;
  isAliasOf: (other: any) => boolean;
};

/**
 * Removes the internals of an Embind object.
 *
 * @param T - The type of the object to remove the internals from.
 * @returns The object with the internals removed.
 *
 * @ignore
 */
export type RemoveEmbindInternals<T> = Omit<
  T,
  "delete" | "isDeleted" | "deleteLater" | "isAliasOf"
>;

/**
 * The main EmscriptenModule interface.
 *
 * @ignore
 */
export interface EmscriptenModule {
  print(str: string): void;
  printErr(str: string): void;
  arguments: string[];
  environment: EnvironmentType;
  preInit: Array<{ (): void }>;
  preRun: Array<{ (): void }>;
  postRun: Array<{ (): void }>;
  onAbort: { (what: any): void };
  onRuntimeInitialized: { (): void };
  preinitializedWebGLContext: WebGLRenderingContext;
  noInitialRun: boolean;
  noExitRuntime: boolean;
  logReadFiles: boolean;
  filePackagePrefixURL: string;
  wasmBinary: ArrayBuffer;

  // Missing types:
  // https://emscripten.org/docs/api_reference/module.html#Module.mainScriptUrlOrBlob
  mainScriptUrlOrBlob?: string;
  // for logging progress
  // https://emscripten.org/docs/api_reference/emscripten.h.html#c.emscripten_push_uncounted_main_loop_blocker
  setStatus: (text: string) => void;

  /**
   * Allows you to provide your own WebAssembly.Memory to use as the memory. The
   * properties used to initialize the memory should match the compiler options.
   * For example, if you set INITIAL_MEMORY to 8MB without memory growth, then
   * the wasmMemory you provide (if any) should have both the 'initial' and
   * 'maximum' set to 128 (due to WASM page sizes being 64KB).
   */
  wasmMemory: WebAssembly.Memory;

  destroy(object: object): void;
  getPreloadedPackage(
    remotePackageName: string,
    remotePackageSize: number,
  ): ArrayBuffer;
  instantiateWasm(
    imports: WebAssembly.Imports,
    successCallback: (module: WebAssembly.Instance) => void,
  ): WebAssembly.Exports | undefined;
  locateFile(url: string, scriptDirectory: string): string;
  onCustomMessage(event: MessageEvent): void;

  // USE_TYPED_ARRAYS == 1
  HEAP: Int32Array;
  IHEAP: Int32Array;
  FHEAP: Float64Array;

  // USE_TYPED_ARRAYS == 2
  HEAP8: Int8Array;
  HEAP16: Int16Array;
  HEAP32: Int32Array;
  HEAPU8: Uint8Array;
  HEAPU16: Uint16Array;
  HEAPU32: Uint32Array;
  HEAPF32: Float32Array;
  HEAPF64: Float64Array;
  HEAP64: BigInt64Array;
  HEAPU64: BigUint64Array;

  TOTAL_STACK: number;
  TOTAL_MEMORY: number;
  FAST_MEMORY: number;

  addOnPreRun(cb: () => any): void;
  addOnInit(cb: () => any): void;
  addOnPreMain(cb: () => any): void;
  addOnExit(cb: () => any): void;
  addOnPostRun(cb: () => any): void;

  preloadedImages: any;
  preloadedAudios: any;

  _malloc(size: number): number;
  _free(ptr: number): void;
}

/**
 * A factory function is generated when setting the `MODULARIZE` build option to
 * `1` in your Emscripten build. It return a Promise that resolves to an
 * initialized, ready-to-call `EmscriptenModule` instance.
 *
 * By default, the factory function will be named `Module`. It's recommended to
 * use the `EXPORT_ES6` option, in which the factory function will be the
 * default export. If used without `EXPORT_ES6`, the factory function will be a
 * global variable. You can rename the variable using the `EXPORT_NAME` build
 * option. It's left to you to declare any global variables as needed in your
 * application's types.
 *
 * @param moduleOverrides Default properties for the initialized module.
 *
 * @ignore
 */
export type EmscriptenModuleFactory<
  T extends EmscriptenModule = EmscriptenModule,
> = (moduleOverrides?: Partial<T>) => Promise<T>;
