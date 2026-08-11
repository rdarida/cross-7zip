import { describe, expect, it } from 'vitest';

import { execute } from '../src/utils';

describe('Test export', () => {
  it('throws an error if command is not found', async () => {
    await expect(execute('test-command', [])).rejects.toThrow();
  });
});
