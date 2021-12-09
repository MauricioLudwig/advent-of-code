import { Input, Divisor } from './input';

const getFilePath = (fileName: string): string =>
  __dirname + '/../__fixtures__/files/' + fileName + '.txt';

describe('test suites for input parser', () => {
  test('should parse file as single line', () => {
    const fixtures: [string, string][] = [
      ['as-single-line_1', '13,16,0,12,15,1'],
    ];

    fixtures.forEach(([fileName, result]) => {
      const data = new Input(getFilePath(fileName)).asSingleLine;
      expect(data).toEqual(result);
    });
  });

  test('should parse file as array of strings', () => {
    const fixtures: [string, Array<string>][] = [];

    fixtures.forEach(([fileName, result]) => {
      const data = new Input(getFilePath(fileName)).asArray;
      expect(data).toEqual(result);
    });
  });

  test('should parse file as array of numbers', () => {
    const fixtures: [string, Array<number>][] = [
      ['as-numbers-array_1', [1511, 1112, 1958, 1886, 285]],
      ['as-numbers-array_2', [160, 34, 123, 159, 148, 93, 165]],
    ];

    fixtures.forEach(([fileName, result]) => {
      const data = new Input(getFilePath(fileName)).asNumbersArray;
      expect(data).toEqual(result);
    });
  });

  test('should parse file as matrix', () => {
    const data = new Input(getFilePath('as-matrix_1')).AsMatrix(
      Divisor.NewLine
    );

    expect(data).toEqual([
      ['7,4,9,5,11'],
      ['22 13 17', ' 8  2 23', '21  9 14'],
      ['123456789'],
    ]);
  });
});
