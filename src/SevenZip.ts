import { rimraf, rimrafSync } from 'rimraf';

import { ZipOptions } from './types';
import { execute, executeSync, getSevenZipPath } from './utils';

const DEFAULT_ZIP_OPTIONS: ZipOptions = {
  destination: '',
  files: []
};

/**
 * A wrapper class for creating 7-Zip archives using the command-line tool.
 *
 * This class allows users to compress multiple files into a `.7z` archive with
 * optional password protection, compression levels, and overwrite capabilities.
 * It supports both asynchronous and synchronous execution.
 *
 * @example
 * ```ts
 * import { SevenZip } from 'cross-7zip';
 *
 * function createArchiveSync(): void {
 *   try {
 *     const zip = new SevenZip({
 *       destination: 'example.7z',
 *       files: ['document.txt', 'image.png', 'folder'],
 *       level: 5,
 *       passwrod: 'secure123',
 *       overwrite: true
 *     });
 *
 *     zip.runSync();
 *     console.log('Archive created successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during compression:', error);
 *   }
 * }
 *
 * async function createArchive(): Promise<void> {
 *   try {
 *     const zip = new SevenZip()
 *       .setDestination('example.7z')
 *       .setFiles(['document.txt', 'image.png', 'folder'])
 *       .setLevel(5)
 *       .setPassword('secure123')
 *       .overwrite();
 *
 *     await zip.run();
 *     console.log('Archive created successfully.');
 *   } catch (error) {
 *     console.error('An error occurred during compression:', error);
 *   }
 * }
 * ```
 *
 * @throws {Error} Will throw an error if the 7-Zip executable is not found.
 *
 * For additional examples, see the
 * [zipUnzip.test.ts](https://github.com/rdarida/cross-7zip/blob/main/tests/zipUnzip.test.ts)
 * or
 * [zipUnzipSync.test.ts](https://github.com/rdarida/cross-7zip/blob/main/tests/zipUnzipSync.test.ts).
 */
export class SevenZip {
  private _options: ZipOptions;

  /**
   * Gets the path to the 7-Zip executable.
   */
  public get command(): string | undefined {
    return getSevenZipPath();
  }

  /**
   * Generates the arguments for the 7-Zip command-line execution.
   */
  public get args(): string[] {
    const { destination, files, level, password } = this._options;

    return [
      'a',
      destination,
      ...files,
      level ? `-mx${Math.max(1, Math.min(level, 9))}` : '',
      password ? `-p${password}` : '',
      password ? '-mhe=on' : ''
    ].filter(v => !!v);
  }

  /**
   * Returns the destination path of the archive.
   */
  public get destination(): string {
    return this._options.destination;
  }

  /**
   * Returns whether the existing archive should be overwritten.
   */
  public get overwrite(): boolean {
    return this._options.overwrite || false;
  }

  /**
   * Creates an instance of `SevenZip` with optional compression settings.
   *
   * @param option Partial zip options (e.g., destination, files, compression level).
   */
  constructor(option?: Partial<ZipOptions>) {
    this._options = {
      ...DEFAULT_ZIP_OPTIONS,
      ...option
    };
  }

  /**
   * Sets the destination path for the output `.7z` file.
   *
   * @param destination The output file path.
   * @returns The `SevenZip` instance for method chaining.
   */
  public setDestination(destination: string): SevenZip {
    this._options.destination = destination;
    return this;
  }

  /**
   * Sets the list of files and folders to be compressed.
   *
   * @param files An array of file or directory paths.
   * @returns The `SevenZip` instance for method chaining.
   */
  public setFiles(files: string[]): SevenZip {
    this._options.files = files;
    return this;
  }

  /**
   * Sets the compression level (1-9).
   *
   * @param level Compression level, where 1 is the fastest and 9 is the best compression.
   * @returns The `SevenZip` instance for method chaining.
   */
  public setLevel(level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9): SevenZip {
    this._options.level = level;
    return this;
  }

  /**
   * Enables overwrite mode, allowing an existing archive to be replaced.
   *
   * @returns The `SevenZip` instance for method chaining.
   */
  public withOverwrite(): SevenZip {
    this._options.overwrite = true;
    return this;
  }

  /**
   * Sets a password for the archive.
   *
   * @param password The encryption password.
   * @returns The `SevenZip` instance for method chaining.
   */
  public setPassword(password: string): SevenZip {
    this._options.password = password;
    return this;
  }

  /**
   * Executes the compression process **asynchronously**.
   *
   * @returns A promise that resolves when the archive is created.
   *
   * @throws {Error} If the 7-Zip executable is not found.
   */
  public async run(): Promise<void> {
    const { command, args, destination, overwrite } = this;

    if (!command) {
      throw new Error('7-Zip executable not found.');
    }

    if (overwrite) {
      return rimraf(destination).then(() => execute(command, args));
    }

    return execute(command, args);
  }

  /**
   * Executes the compression process **synchronously**.
   *
   * @throws {Error} If the 7-Zip executable is not found.
   */
  public runSync(): void {
    const { command, args, destination, overwrite } = this;

    if (!command) {
      throw new Error('7-Zip executable not found.');
    }

    if (overwrite) {
      rimrafSync(destination);
    }

    executeSync(command, args);
  }
}
