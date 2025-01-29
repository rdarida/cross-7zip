import { join } from 'path';
import { readdirSync } from 'fs';

export const TEMP_DIR = join(__dirname, '.temp');

export const DATA_DIR = join(__dirname, 'data');

export const TEST_FILES = readdirSync(DATA_DIR).map(fileName =>
  join(DATA_DIR, fileName)
);

export const TEST_ZIP = join(TEMP_DIR, 'test zip.7z');

export const TEST_PASSWORD = 'yxASqw12';
