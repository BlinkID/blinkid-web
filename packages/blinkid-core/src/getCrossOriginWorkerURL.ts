/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

const type = "application/javascript";

type Options = {
  skipSameOrigin?: boolean;
  useBlob?: boolean;
};

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
