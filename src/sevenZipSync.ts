import { executeSync, getSevenZipPath } from './utils';

/**
 * Compresses multiple files into a zipped file **synchronously**.
 *
 * @param paths Specifies the paths to the files to add to the zipped file.
 *
 * @param destination Specifies the path to the output zipped file.
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * @example
 * // Example usage:
 * import { sevenZipSync } from 'cross-7zip';
 *
 * function createArchive() {
 *   try {
 *     const paths = ['document.txt', 'image.png', 'folder'];
 *     const destination = 'example.7z';
 *
 *     sevenZipSync(paths, destination);
 *     console.log('Archive created successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during compression:', error);
 *   }
 * }
 */
export function sevenZipSync(paths: string[], destination: string): void {
  const command = getSevenZipPath();

  if (!command) {
    throw new Error('7-Zip executable not found.');
  }

  const args = ['a', destination, ...paths];

  executeSync(command, args);
}
