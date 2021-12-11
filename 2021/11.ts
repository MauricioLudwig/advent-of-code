import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

export default async (): TDayFn => {
  const input = new Input('./2021/files/11.txt');

  const grid = input.asArray.map((o) => o.split('').map(Number));

  let currentFlashes: Record<string, true> = {};
  const steps = 1000;
  let flashes = 0;
  let stop = false;

  for (let s = 1; s <= steps; s++) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y]!.length; x++) {
        flashes += increaseEnergyLevel(grid, x, y, currentFlashes);
      }
    }

    if (s === 100) {
      Logger.success(`Part 1: ${flashes}`);
    }

    if (Object.keys(currentFlashes).length === 100) {
      Logger.success(`Part 2: ${s}`);
      stop = true;
      break;
    }

    currentFlashes = {};

    if (stop) {
      break;
    }
  }

  // printGrid(grid);
};

const increaseEnergyLevel = (
  grid: number[][],
  x: number,
  y: number,
  currentFlashes: Record<string, true>
): number => {
  const row = grid[y];

  if (row === undefined) {
    return 0;
  }

  const col = row[x];
  const key = `${x},${y}`;

  if (col === undefined) {
    return 0;
  }

  if (col === 9) {
    let flashes = 0;

    if (!currentFlashes[key]) {
      flashes++;
      currentFlashes[key] = true;
    }

    grid[y]![x] = 0;
    return [
      [x - 1, y], // left
      [x + 1, y], // right
      [x, y - 1], // top
      [x, y + 1], // bottom
      [x - 1, y - 1], // top-left
      [x + 1, y - 1], // top-right
      [x - 1, y + 1], // bottom-left
      [x + 1, y + 1], // bottom-right
    ].reduce((acc, [x1, y1]) => {
      return acc + increaseEnergyLevel(grid, x1!, y1!, currentFlashes);
    }, flashes);
  } else {
    if (!currentFlashes[key]) {
      grid[y]![x]++;
    }
    return 0;
  }
};

const printGrid = (grid: number[][]) => {
  let s = '';

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y]!.length; x++) {
      s += grid[y]![x];
    }

    s += '\n';
  }

  console.log(s);
};
