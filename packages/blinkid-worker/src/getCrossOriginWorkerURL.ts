/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Original: https://github.com/CezaryDanielNowak/CrossOriginWorker
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

  return new Promise<string>(
    (resolve, reject) =>
      void fetch(originalWorkerUrl)
        .then((res) => res.text())
        .then((codeString) => {
          const workerPath = new URL(originalWorkerUrl).href.split("/");
          workerPath.pop();

          let finalURL = "";

          if (options.useBlob) {
            const blob = new Blob([codeString], { type });
            finalURL = URL.createObjectURL(blob);
          } else {
            finalURL = `data:${type},` + encodeURIComponent(codeString);
          }

          resolve(finalURL);
        })
        .catch(reject),
  );
};
