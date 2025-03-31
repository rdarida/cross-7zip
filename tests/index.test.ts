import {
  SevenUnzip,
  SevenZip,
  sevenUnzip,
  sevenUnzipSync,
  sevenZip,
  sevenZipSync
} from '../src/index';

describe('Test export', () => {
  it('exports SevenUnzip', () => {
    expect(SevenUnzip).toBeTruthy();
  });

  it('exports SevenZip', () => {
    expect(SevenZip).toBeTruthy();
  });

  it('exports sevenUnzip', () => {
    expect(sevenUnzip).toBeTruthy();
  });

  it('exports sevenUnzipSync', () => {
    expect(sevenUnzipSync).toBeTruthy();
  });

  it('exports sevenZip', () => {
    expect(sevenZip).toBeTruthy();
  });

  it('exports sevenZipSync', () => {
    expect(sevenZipSync).toBeTruthy();
  });
});
