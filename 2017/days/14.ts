import { success, end } from '../utils/logger';
import { KnotHash, convertToAscii } from './10';

interface HexBinaryTable {
  [key: string]: string;
}

enum Square {
  free = '.',
  used = '#',
}

const hexBinaryTable: HexBinaryTable = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  a: '1010',
  b: '1011',
  c: '1100',
  d: '1101',
  e: '1110',
  f: '1111',
};

export default (): void => {
  const input = 'xlqgujun';
  const suffix = [17, 31, 73, 47, 23];
  const grid: (string | number)[][] = [];

  for (let i = 0; i < 128; i++) {
    const ascii = [...convertToAscii(`${input}-${i}`), ...suffix];
    const knotHash = new KnotHash();
    knotHash.hash(ascii, 64);
    const row = knotHash
      .hexa()
      .split('')
      .map((o): string[] =>
        hexBinaryTable[o]
          .split('')
          .map((x): string => (x === '1' ? Square.used : Square.free))
      )
      .flat();
    grid.push(row);
  }

  const usedSquares = grid.flat().filter((o): boolean => o === Square.used)
    .length;
  success(`Part 1: ${usedSquares}`);

  let regions = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (!(grid[y] && grid[y][x] === Square.used)) {
        continue;
      }
      recursion(x, y, grid, ++regions);
    }
  }

  success(`Part 2: ${regions}`);

  end();
};

const recursion = (
  x: number,
  y: number,
  grid: (string | number)[][],
  regions: number
) => {
  if (!(grid[y] && grid[y][x] === Square.used)) {
    return;
  }

  grid[y][x] = regions;
  recursion(x - 1, y, grid, regions);
  recursion(x + 1, y, grid, regions);
  recursion(x, y - 1, grid, regions);
  recursion(x, y + 1, grid, regions);

  return;
};
