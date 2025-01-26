import { executeSync, getSevenZipPath } from './utils';

/**
 * Extracts files from a specified zipped file **synchronously**.
 *
 * @param archive Specifies the path to the zipped file.
 *
 * @param destination Specifies the path to the output directory.
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * @example
 * // Example usage:
 * import { sevenUnzipSync } from 'cross-7zip';
 *
 * function extractFiles() {
 *   try {
 *     const archive = 'example.7z';
 *     const destination = './output';
 *
 *     sevenUnzipSync(archive, destination);
 *     console.log('Extraction completed successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during extraction:', error);
 *   }
 * }
 */
export function sevenUnzipSync(archive: string, destination: string): void {
  const command = getSevenZipPath();

  if (!command) {
    throw new Error('7-Zip executable not found.');
  }

  const args = ['x', archive, `-o${destination}`];

  executeSync(command, args);
}
