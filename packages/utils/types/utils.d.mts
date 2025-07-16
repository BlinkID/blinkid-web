/**
 * Returns the path to the resources directory of the package.
 *
 * @param {string} sdk
 */
export function getResourcesPath(sdk: string): string;
/**
 * Returns the path to the package.
 *
 * @param {string} packageName name of the package
 * TODO: this function does not work when invoked from the root of the project.
 * one such example is running vitest from the root of the project.
 */
export function getPackagePath(packageName: string): string;
/**
 * Symlinks the resources from the source path to the destination path.
 * Falls back to copying if symlinking fails (e.g., on Windows without admin rights).
 *
 * @param {string} sourcePath
 * @param {string} destinationPath
 */
export function linkResources(sourcePath: string, destinationPath: string): Promise<void>;
/**
 * Moves the resources from the package path to the moveTo path.
 *
 * @param {string} packagePath
 * @param {string} moveTo
 */
export function moveResources(packagePath: string, moveTo: string): Promise<void>;
//# sourceMappingURL=utils.d.mts.map