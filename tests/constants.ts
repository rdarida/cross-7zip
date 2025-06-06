import { join } from 'path';
import { readdirSync } from 'fs';

export const DATA_DIR = join(__dirname, 'data');

export const TEMP_DIR = join(__dirname, '.temp');

export const TEMP_DATA_DIR = join(TEMP_DIR, 'data');

export const TEST_FILES = readdirSync(DATA_DIR).map(fileName =>
  join(TEMP_DATA_DIR, fileName)
);

export const TEST_ZIP = join(TEMP_DIR, 'test zip.7z');
export const OVERWRITE_TEST_ZIP = join(TEMP_DIR, 'overwrite test zip.7z');
export const PASSWORD_TEST_ZIP = join(TEMP_DIR, 'password test zip.7z');

export const TEST_PASSWORD = 'secure 123';
