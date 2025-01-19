import { resolve } from 'path';
import { rimrafSync } from 'rimraf';

export const TEMP_DIR = resolve(__dirname, '.temp');

export default function afterAll(): void {
  rimrafSync(TEMP_DIR);
}
