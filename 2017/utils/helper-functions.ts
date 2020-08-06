import chalk from 'chalk';

export const compareSetEquality = <T>(set1: Set<T>, set2: Set<T>): boolean => {
  const mergedSets = new Set([...Array.from(set1), ...Array.from(set2)]);
  return set1.size === mergedSets.size;
};

export const compareArrayEquality = <T>(arr1: T[], arr2: T[]): boolean => {
  return arr1.length === arr2.length && arr1.every((o, i) => o === arr2[i]);
};

export interface IGrid {
  [key: string]: {
    [key: string]: string;
  };
}

type DrawGrid = (
  grid: IGrid,
  defaultValue: string,
  node?: { x: number; y: number },
  index?: number
) => void;

export const drawGrid: DrawGrid = (grid, defaultValue, node, index): void => {
  let str = '';

  const valuesY = Object.keys(grid).map(Number);
  const minY = Math.min(...valuesY);
  const maxY = Math.max(...valuesY);

  const valuesX = Object.values(grid)
    .map((o): number[] => Object.keys(o).map(Number))
    .flat();
  const minX = Math.min(...valuesX);
  const maxX = Math.max(...valuesX);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (grid[y] && grid[y][x]) {
        if (node && node.y === y && x === node.x) {
          str += chalk.magenta(grid[y][x]);
        } else {
          str += grid[y][x];
        }
      } else {
        str += defaultValue;
      }
    }
    str += '\n';
  }

  if (index !== undefined) {
    str += chalk.cyan(`i(${index})\n`);
  }

  console.log(str);
};
