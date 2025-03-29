export type UnzipOptions = {
  /**
   * Specifies the path to the zipped file.
   */
  archive: string;
  /**
   * Specifies the path to the output directory.
   */
  destination: string;
  /**
   * Password for the archive.
   */
  password?: string;
};

export type ZipOptions = {
  /**
   * Specifies the path to the output zipped file.
   */
  destination: string;
  /**
   * Specifies the paths to the files to add to the zipped file.
   */
  files: string[];
  /**
   * Compression level (1-9)
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  /**
   * Password for the archive.
   */
  password?: string;
  /**
   * Overwrites the existing ZIP file instead of updating it.
   */
  overwrite?: boolean;
};
