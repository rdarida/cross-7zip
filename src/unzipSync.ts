import { UnzipOptions } from './types';
import { SevenUnzip } from './SevenUnzip';

/**
 * Extracts files from a specified zipped file **synchronously**.
 *
 * @param options An object containing options for the extraction process.
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * @example
 * ```ts
 * import { sevenUnzipSync } from 'cross-7zip';
 *
 * function extractFilesSync(): void {
 *   try {
 *     const unzipOptions: UnzipOptions = {
 *       archive: 'example.7z',
 *       destination: './output'
 *     };
 *
 *     sevenUnzipSync(unzipOptions);
 *     console.log('Extraction completed successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during extraction:', error);
 *   }
 * }
 * ```
 *
 * For additional examples, see the
 * [test file](https://github.com/rdarida/cross-7zip/blob/main/tests/zipUnzipSync.test.ts).
 */
export function sevenUnzipSync(options: UnzipOptions): void {
  const sevenUnzip = new SevenUnzip(options);
  sevenUnzip.runSync();
}
