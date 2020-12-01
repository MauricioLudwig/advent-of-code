import { getFirstMarkerInstance } from './09';

describe('test suites for getFirstMarkerInstance fn', () => {
  test('should return null for invalid marker', () => {
    expect(getFirstMarkerInstance('ADVENT')).toBeNull();
  });

  test('should return numbers for valid marker', () => {
    expect(getFirstMarkerInstance('A(1x5)BC')).toEqual([1, 5]);
  });
});
