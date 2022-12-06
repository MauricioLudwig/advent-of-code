import { Divisor, Input, Logger } from '../@@utils';
import chalk from 'chalk';

export default async () => {
  const [s1, s2] =
    new Input('./2021/files/13.txt').AsMatrix(Divisor.NewLine) || [];

  // Toggle for Part 1 or 2
  const isPart1 = false;

  const dots = s1!.map((o) => {
    const [x, y] = o.split(',');
    return {
      x: parseInt(x!, 10),
      y: parseInt(y!, 10),
    };
  });

  const folds = s2!.map((o) => {
    const [, s1, s2] = o.match(/fold along ([xy])=(\d+)/) || [];
    return {
      axis: s1!,
      value: parseInt(s2!, 10),
    };
  });

  const xDots = dots.map((o) => o.x);
  const yDots = dots.map((o) => o.y);

  const xMax = Math.max(...xDots);
  const yMax = Math.max(...yDots) + (isPart1 ? 0 : 3);

  let grid: string[][] = Array(yMax + 1)
    .fill(0)
    .map((_, yi) => {
      return Array(xMax + 1)
        .fill(0)
        .map((_, xi) => {
          return dots.find((o) => o.x === xi && o.y === yi) ? '#' : '.';
        });
    });

  for (let i = 0; i < (isPart1 ? 2 : folds.length); i++) {
    const { axis, value } = folds[i]!;

    if (axis === 'y') {
      grid = foldAlongYAxis(grid, value);
    } else {
      grid = foldAlongXAxis(grid, value);
    }
  }

  if (isPart1) {
    const visibleDots = grid.flat().filter((o) => o === '#').length;
    Logger.success(`Part 1: ${visibleDots}`);
  } else {
    printGrid(grid);
  }
};

const printGrid = (grid: string[][]) => {
  let s = '';

  for (let i = 0; i < grid.length; i++) {
    for (let y = 0; y < grid[i]!.length; y++) {
      if (grid[i]![y]! === '#') {
        s += chalk.bgBlue('#');
      } else {
        s += ' ';
      }
    }

    s += '\n';
  }

  console.log(s);
};

const foldAlongYAxis = (grid: string[][], value: number) => {
  const grid1 = [...grid].slice(0, value);
  const grid2 = [...grid].slice(value + 1, grid.length);
  const yMax = Math.max(...[grid1.length, grid2.length]);
  const emptyRow = Array(grid[0]!.length).fill('.');

  if (grid1.length < yMax) {
    Array(yMax - grid1.length)
      .fill(0)
      .forEach((_) => {
        grid1.unshift([...emptyRow]);
      });
  }

  if (grid2.length < yMax) {
    Array(yMax - grid2.length)
      .fill(0)
      .forEach((_) => {
        grid2.unshift([...emptyRow]);
      });
  }

  for (let i = grid1.length; i > 0; i--) {
    for (let x = 0; x < grid1[0]!.length; x++) {
      const index = Math.abs(value - i);
      if (grid1[index]![x]! === '#') {
        continue;
      } else {
        grid1[index]![x]! = grid2[i - 1]![x]!;
      }
    }
  }

  return grid1;
};

const foldAlongXAxis = (grid: string[][], value: number) => {
  const grid1 = [...grid.map((o) => o.slice(0, value))];
  const grid2 = [...grid.map((o, i) => o.slice(value + 1, grid[i]!.length))];
  const xMax = Math.max(...[grid1[0]!.length, grid2[0]!.length]);

  if (grid1[0]!.length < xMax) {
    const emptyRow = Array(xMax - grid1[0]!.length).fill('.');

    grid1.forEach((o) => {
      o.push(...emptyRow);
    });
  }

  if (grid2[0]!.length < xMax) {
    const emptyRow = Array(xMax - grid2[0]!.length).fill('.');

    grid2.forEach((o) => {
      o.push(...emptyRow);
    });
  }

  for (let i = 0; i < grid1.length; i++) {
    for (let x = grid1[0]!.length; x > 0; x--) {
      const index = Math.abs(value - x);
      if (grid1[i]![index]! === '#') {
        continue;
      } else {
        grid1[i]![index]! = grid2[i]![x - 1]!;
      }
    }
  }

  return grid1;
};
