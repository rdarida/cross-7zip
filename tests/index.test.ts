import {
  getSevenZipPath,
  sevenUnzip,
  sevenUnzipSync,
  sevenZip,
  sevenZipSync
} from '../src/index';

describe('Test export', () => {
  test('getSevenZipPath should be truthy', () => {
    expect(getSevenZipPath).toBeTruthy();
  });

  test('sevenUnzip should be truthy', () => {
    expect(sevenUnzip).toBeTruthy();
  });

  test('sevenUnzipSync should be truthy', () => {
    expect(sevenUnzipSync).toBeTruthy();
  });

  test('sevenZip should be truthy', () => {
    expect(sevenZip).toBeTruthy();
  });

  test('sevenZipSync should be truthy', () => {
    expect(sevenZipSync).toBeTruthy();
  });
});
