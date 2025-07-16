/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

const type = "application/javascript";

/**
 * Options for the getCrossOriginWorkerURL function.
 *
 * @param skipSameOrigin - If true, the function will return the original URL if it is same-origin.
 * @param useBlob - If true, the function will return a blob URL.
 */
type Options = {
  /** If true, the function will return the original URL if it is same-origin. */
  skipSameOrigin?: boolean;
  /** If true, the function will return a blob URL if not same-origin. */
  useBlob?: boolean;
};

/**
 * Gets a cross-origin worker URL as a data URL or blob URL. If the URL is same-origin, it will return the original URL.
 *
 * @param originalWorkerUrl - The original worker URL.
 * @param _options - The options for the worker.
 * @returns A promise that resolves with the cross-origin worker URL.
 */
export const getCrossOriginWorkerURL = (
  originalWorkerUrl: string,
  _options: Options = {},
) => {
  const options = {
    skipSameOrigin: true,
    useBlob: true,

    ..._options,
  };

  if (
    options.skipSameOrigin &&
    new URL(originalWorkerUrl).origin === self.location.origin
  ) {
    // The same origin - Worker will run fine
    return Promise.resolve(originalWorkerUrl);
  }

  let signal: AbortSignal;

  try {
    // Setup the abort controller
    const controller = new AbortController();
    signal = controller.signal;

    const timeout = setTimeout(() => {
      controller.abort();
    }, 3000);

    const cleanup = () => {
      clearTimeout(timeout);
      controller.abort();
    };

    signal.addEventListener("abort", cleanup);
  } catch (error) {
    // just swallow the error
  }

  return new Promise<string>(
    (resolve, reject) =>
      void fetch(originalWorkerUrl, {
        // abort if the worker is not fetched in a reasonable time
        signal,
      })
        .then((res) => res.text())
        .then((codeString) => {
          let finalURL = "";

          if (options.useBlob) {
            const blob = new Blob([codeString], { type });
            finalURL = URL.createObjectURL(blob);
          } else {
            finalURL = `data:${type},` + encodeURIComponent(codeString);
          }
          resolve(finalURL);
        })
        .catch(() => {
          reject(new Error(`Failed to fetch worker from ${originalWorkerUrl}`));
        }),
  );
};
