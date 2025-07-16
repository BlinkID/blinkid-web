/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Original: https://github.com/CezaryDanielNowak/CrossOriginWorker
 */

/**
 * The type of the worker.
 */
const workerType = "application/javascript";

/**
 * The options.
 */
type Options = {
  /**
   * Whether to skip same origin.
   */
  skipSameOrigin?: boolean;
  /**
   * Whether to use blob.
   */
  useBlob?: boolean;
};

/**
 * Gets the cross-origin worker URL.
 * If same origin, the original worker URL is returned.
 * Otherwise, the worker is fetched and converted to a blob or data URL.
 *
 * @param originalWorkerUrl - The original worker URL.
 * @param _options - The options.
 * @returns The cross-origin worker URL.
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

  return new Promise<string>(
    (resolve, reject) =>
      void fetch(originalWorkerUrl)
        .then((res) => res.text())
        .then((codeString) => {
          const workerPath = new URL(originalWorkerUrl).href.split("/");
          workerPath.pop();

          let finalURL = "";

          if (options.useBlob) {
            const blob = new Blob([codeString], { type: workerType });
            finalURL = URL.createObjectURL(blob);
          } else {
            finalURL = `data:${workerType},` + encodeURIComponent(codeString);
          }

          resolve(finalURL);
        })
        .catch(reject),
  );
};
