import { CutNamePipe } from './cut-name.pipe';

describe('CutNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CutNamePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return the first letter of each word', () => {
    const pipe = new CutNamePipe();
    expect(pipe.transform('David Barcenas')).toBe('DB');
  });
  it('should return the first two letters of the name', () => {
    const pipe = new CutNamePipe();
    expect(pipe.transform('Karen')).toBe('Ka');
  });
  it('should return an empty string', () => {
    const pipe = new CutNamePipe();
    expect(pipe.transform('')).toBe('');
  });
});
