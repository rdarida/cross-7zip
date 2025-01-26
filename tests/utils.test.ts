import { execute } from '../src/utils';

describe('Test export', () => {
  test('throws an error if command is not found', async () => {
    await expect(execute('test-command', [])).rejects.toThrow();
  });
});
