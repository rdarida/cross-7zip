import { rmSync } from 'fs';

import { TEMP_DIR } from './constants';

export default function globalTeardown(): void {
  rmSync(TEMP_DIR, { recursive: true, force: true });
}
