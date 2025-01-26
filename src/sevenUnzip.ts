import { execute, getSevenZipPath } from './utils';

/**
 * Extracts files from a specified zipped file **asynchronously**.
 *
 * @param archive Specifies the path to the zipped file.
 *
 * @param destination Specifies the path to the output directory.
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * @example
 * import { sevenUnzip } from 'cross-7zip';
 *
 * async function extractFiles() {
 *   try {
 *     const archive = 'example.7z';
 *     const destination = './output';
 *
 *     await sevenUnzip(archive, destination);
 *     console.log('Extraction completed successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during extraction:', error);
 *   }
 * }
 */
export async function sevenUnzip(
  archive: string,
  destination: string
): Promise<void> {
  const command = getSevenZipPath();

  if (!command) {
    throw new Error('7-Zip executable not found.');
  }

  const args = ['x', archive, `-o${destination}`];

  return execute(command, args);
}
