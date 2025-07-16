// @ts-check
import { fs, path } from "zx";
import pkgPath from "resolve-package-path";

/**
 * Returns the path to the resources directory of the package.
 *
 * @param {string} sdk
 */
export function getResourcesPath(sdk) {
  const sdkPath = getPackagePath(sdk);

  const src = `${sdkPath}/dist/resources`;

  return src;
}

/**
 * Returns the path to the package.
 *
 * @param {string} packageName name of the package
 * TODO: this function does not work when invoked from the root of the project.
 * one such example is running vitest from the root of the project.
 */
export function getPackagePath(packageName) {
  const packagePath = pkgPath(packageName, ".");
  
  if (!packagePath) return null;
  
  // Normalize path for cross-platform compatibility
  const normalizedPath = path.normalize(packagePath);
  return normalizedPath.replace(`${path.sep}package.json`, "");
}

/**
 * Copies resources from source to destination with overwrite option.
 * 
 * @param {string} sourcePath
 * @param {string} destinationPath
 */
async function copyResources(sourcePath, destinationPath) {
  if (!fs.pathExistsSync(sourcePath)) {
    console.log(`${sourcePath} doesn't exist`);
    return;
  }
  
  try {
    await fs.copy(sourcePath, destinationPath, { overwrite: true });
    console.log(`Copied files to ${destinationPath}`);
  } catch (copyError) {
    console.error(`Failed to copy files: ${copyError}`);
    throw copyError;
  }
}

/**
 * Symlinks the resources from the source path to the destination path.
 * Falls back to copying if symlinking fails (e.g., on Windows without admin rights).
 *
 * @param {string} sourcePath
 * @param {string} destinationPath
 */
export async function linkResources(sourcePath, destinationPath) {
  if (!fs.pathExistsSync(sourcePath)) {
    console.log(`${sourcePath} doesn't exist`);
    return;
  }

  try {
    // First try to create a symlink
    await fs.ensureSymlink(sourcePath, destinationPath);
    console.log(`Symlinked files to ${destinationPath}`);
  } catch (error) {
    // If symlinking fails, fall back to copying
    console.log(`Symlinking failed, falling back to copying: ${error.message}`);
    await copyResources(sourcePath, destinationPath);
  }
}

/**
 * Moves the resources from the package path to the moveTo path.
 *
 * @param {string} packagePath
 * @param {string} moveTo
 */
export async function moveResources(packagePath, moveTo) {
  const pkgPath = getPackagePath(packagePath);
  if (!pkgPath) {
    throw new Error(`Could not find package path for ${packagePath}`);
  }
  const resourcesPath = path.join(pkgPath, "dist", "resources");

  if (!fs.pathExistsSync(resourcesPath)) {
    throw new Error(
      `Resources directory does not exist at ${resourcesPath}. Make sure ${packagePath} is built first.`,
    );
  }

  const files = fs.readdirSync(resourcesPath);
  fs.ensureDirSync(moveTo);

  for (const filePath of files) {
    await linkResources(
      path.join(resourcesPath, filePath),
      path.join("public/resources", filePath),
    );
  }
}
