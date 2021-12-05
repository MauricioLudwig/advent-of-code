import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

export default async (): TDayFn => {
  const input = new Input('./2021/files/05.txt').asArray.map((o) => {
    const [, x1, y1, x2, y2] = o.match(/(\d+)\,(\d+) -> (\d+)\,(\d+)/) || [];
    return {
      x1: parseInt(x1!, 10),
      y1: parseInt(y1!, 10),
      x2: parseInt(x2!, 10),
      y2: parseInt(y2!, 10),
    };
  });

  const hvLines = input.filter((o) => o.x1 === o.x2 || o.y1 === o.y2);

  const maxX = Math.max(...hvLines.map((o) => [o.x1, o.x2]).flat());
  const maxY = Math.max(...hvLines.map((o) => [o.y1, o.y2]).flat());

  const grid = Array(maxY + 1)
    .fill(0)
    .map((_) => Array(maxX + 1).fill(0));

  hvLines.forEach((o) => {
    const xStart = o.x1 < o.x2 ? o.x1 : o.x2;
    const xEnd = o.x2 > o.x1 ? o.x2 : o.x1;
    const yStart = o.y1 < o.y2 ? o.y1 : o.y2;
    const yEnd = o.y2 > o.y1 ? o.y2 : o.y1;

    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        grid[y]![x]! += 1;
      }
    }
  });

  // printGrid(grid);
  Logger.success(`Part 1: ${getOverlappingLines(grid)}`);

  input
    .filter((o) => Math.abs(o.x1 - o.x2) === Math.abs(o.y1 - o.y2))
    .forEach((o) => {
      if (o.y2 > o.y1) {
        for (let y = o.y1; y <= o.y2; y++) {
          if (o.x2 > o.x1) {
            for (let x = o.x1; x <= o.x2; x++) {
              if (Math.abs(o.y1 - y) === Math.abs(o.x1 - x)) {
                grid[y]![x]! += 1;
              }
            }
          } else {
            for (let x = o.x1; x >= o.x2; x--) {
              if (Math.abs(o.y1 - y) === Math.abs(o.x1 - x)) {
                grid[y]![x]! += 1;
              }
            }
          }
        }
      } else {
        for (let y = o.y1; y >= o.y2; y--) {
          if (o.x2 > o.x1) {
            for (let x = o.x1; x <= o.x2; x++) {
              if (Math.abs(o.y1 - y) === Math.abs(o.x1 - x)) {
                grid[y]![x]! += 1;
              }
            }
          } else {
            for (let x = o.x1; x >= o.x2; x--) {
              if (Math.abs(o.y1 - y) === Math.abs(o.x1 - x)) {
                grid[y]![x]! += 1;
              }
            }
          }
        }
      }
    });

  // printGrid(grid);
  Logger.success(`Part 2: ${getOverlappingLines(grid)}`);
};

const printGrid = (grid: number[][]): void => {
  let print = '';

  for (let i = 0; i < grid.length; i++) {
    let s = '';

    for (let y = 0; y < grid[i]!.length; y++) {
      if (grid[i]![y]! > 0) {
        s += grid[i]![y]!;
      } else {
        s += '.';
      }
    }

    print += `${s}\n`;
  }

  console.log(print);
};

const getOverlappingLines = (grid: number[][]): number =>
  grid.flat().reduce((acc, curr) => acc + (curr > 1 ? 1 : 0), 0);
