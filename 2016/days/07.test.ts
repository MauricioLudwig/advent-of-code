import { isABBA } from './07';

describe('test isABBA function', () => {
  test('should return true for valid sequence', () => {
    expect(isABBA('xyyx')).toBeTruthy();
  });

  test('should return false for invalid sequence', () => {
    expect(isABBA('abcd')).toBeFalsy();
  });

  test('should return false for equal interior characters', () => {
    expect(isABBA('aaaa')).toBeFalsy();
  });

  test('should return true for valid sequence within a larger string', () => {
    expect(isABBA('ioxxoj')).toBeTruthy();
  });
});
