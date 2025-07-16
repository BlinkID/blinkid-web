// @ts-check
import { expect, describe, it, vi, beforeEach } from 'vitest';
import { fs, path } from 'zx';
import pkgPath from 'resolve-package-path';
import { getResourcesPath, getPackagePath, linkResources, moveResources } from './utils.mjs';

// Mock external dependencies
vi.mock('zx', async () => {
  const actual = await vi.importActual('zx');
  return {
    fs: {
      pathExistsSync: vi.fn(),
      ensureSymlink: vi.fn(),
      copy: vi.fn(),
      readdirSync: vi.fn().mockReturnValue(['file1.js', 'file2.js']),
      ensureDirSync: vi.fn(),
    },
    path: actual.path,
  };
});

vi.mock('resolve-package-path', () => ({
  default: vi.fn(),
}));

describe('Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPackagePath', () => {
    it('should return normalized path when package is found', () => {
      const mockPath = path.join('path', 'to', 'package', 'package.json');
      vi.mocked(pkgPath).mockReturnValue(mockPath);

      const result = getPackagePath('test-package');
      expect(result).toBe(path.join('path', 'to', 'package'));
    });

    it('should return null when package is not found', () => {
      vi.mocked(pkgPath).mockReturnValue(null);

      const result = getPackagePath('non-existent-package');
      expect(result).toBeNull();
    });
  });

  describe('getResourcesPath', () => {
    beforeEach(() => {
      // Mock pkgPath for getPackagePath which is used by getResourcesPath
      const mockPath = '/path/to/package/package.json';
      vi.mocked(pkgPath).mockReturnValue(mockPath);
    });

    it('should return correct resources path when package exists', () => {
      const result = getResourcesPath('test-sdk');
      expect(result).toBe(`${path.normalize('/path/to/package')}/dist/resources`);
    });

    it('should handle null package path', () => {
      vi.mocked(pkgPath).mockReturnValue(null);

      const result = getResourcesPath('non-existent-sdk');
      expect(result).toBe('null/dist/resources');
    });
  });

  describe('linkResources', () => {
    const sourcePath = '/source/path';
    const destinationPath = '/destination/path';

    beforeEach(() => {
      vi.clearAllMocks();
      // Reset copy mock to succeed by default
      vi.mocked(fs.copy).mockResolvedValue();
    });

    describe('when source exists', () => {
      beforeEach(() => {
        vi.mocked(fs.pathExistsSync).mockReturnValue(true);
      });

      it('should create symlink when symlinking succeeds', async () => {
        vi.mocked(fs.ensureSymlink).mockResolvedValue();

        await linkResources(sourcePath, destinationPath);

        expect(fs.ensureSymlink).toHaveBeenCalledWith(sourcePath, destinationPath);
        expect(fs.copy).not.toHaveBeenCalled();
      });

      describe('when symlinking fails', () => {
        beforeEach(() => {
          vi.mocked(fs.ensureSymlink).mockRejectedValue(new Error('EPERM: operation not permitted'));
        });

        it('should fall back to copying when copy succeeds', async () => {
          await linkResources(sourcePath, destinationPath);

          expect(fs.ensureSymlink).toHaveBeenCalledWith(sourcePath, destinationPath);
          expect(fs.copy).toHaveBeenCalledWith(sourcePath, destinationPath, { overwrite: true });
        });

        it('should throw error when copy also fails', async () => {
          vi.mocked(fs.copy).mockRejectedValue(new Error('Copy failed'));

          await expect(linkResources(sourcePath, destinationPath)).rejects.toThrow('Copy failed');
        });
      });
    });

    describe('when source does not exist', () => {
      beforeEach(() => {
        vi.mocked(fs.pathExistsSync).mockReturnValue(false);
      });

      it('should log and return without attempting symlink or copy', async () => {
        const consoleSpy = vi.spyOn(console, 'log');

        await linkResources(sourcePath, destinationPath);

        expect(fs.ensureSymlink).not.toHaveBeenCalled();
        expect(fs.copy).not.toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(`${sourcePath} doesn't exist`);
      });
    });
  });

  describe('moveResources', () => {
    const packagePath = 'test-package';
    const mockPkgPath = '/path/to/package';
    const moveTo = '/move/to/path';

    beforeEach(() => {
      // Mock pkgPath for getPackagePath which is used by moveResources
      const mockPath = `${mockPkgPath}/package.json`;
      vi.mocked(pkgPath).mockReturnValue(mockPath);
      vi.mocked(fs.pathExistsSync).mockReturnValue(true);
      // Reset copy mock to succeed by default
      vi.mocked(fs.copy).mockResolvedValue();
    });

    it('should move resources successfully', async () => {
      await moveResources(packagePath, moveTo);

      expect(fs.ensureDirSync).toHaveBeenCalledWith(moveTo);
      expect(fs.readdirSync).toHaveBeenCalledWith(path.join(mockPkgPath, 'dist', 'resources'));
      
      // Try symlink first
      expect(fs.ensureSymlink).toHaveBeenCalledTimes(2);
      expect(fs.ensureSymlink).toHaveBeenNthCalledWith(
        1,
        path.join(mockPkgPath, 'dist', 'resources', 'file1.js'),
        path.join('public/resources', 'file1.js')
      );
      expect(fs.ensureSymlink).toHaveBeenNthCalledWith(
        2,
        path.join(mockPkgPath, 'dist', 'resources', 'file2.js'),
        path.join('public/resources', 'file2.js')
      );

      // Verify copy was called as fallback
      expect(fs.copy).toHaveBeenCalledTimes(2);
      expect(fs.copy).toHaveBeenNthCalledWith(
        1,
        path.join(mockPkgPath, 'dist', 'resources', 'file1.js'),
        path.join('public/resources', 'file1.js'),
        { overwrite: true }
      );
      expect(fs.copy).toHaveBeenNthCalledWith(
        2,
        path.join(mockPkgPath, 'dist', 'resources', 'file2.js'),
        path.join('public/resources', 'file2.js'),
        { overwrite: true }
      );
    });

    it('should throw error when package path is not found', async () => {
      vi.mocked(pkgPath).mockReturnValue(null);

      await expect(moveResources(packagePath, moveTo)).rejects.toThrow(
        `Could not find package path for ${packagePath}`
      );
    });

    it('should throw error when resources directory does not exist', async () => {
      vi.mocked(fs.pathExistsSync).mockReturnValue(false);

      await expect(moveResources(packagePath, moveTo)).rejects.toThrow(
        `Resources directory does not exist at ${path.join(mockPkgPath, 'dist', 'resources')}. Make sure ${packagePath} is built first.`
      );
    });
  });
}); 