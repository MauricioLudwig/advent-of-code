import chalk from 'chalk';
import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

type TInstruction = {
  operation: string;
  dimension?: string;
  axis?: string;
  n1: number;
  n2: number;
};

export default (): void => {
  const columns = 50;
  const rows = 6;

  const grid = Array(rows)
    .fill(0)
    .map(() =>
      Array(columns)
        .fill(0)
        .map(() => '.')
    );

  const instructions: Array<TInstruction> = getAsArray('08.txt').map((o) => {
    const isRectangle = o.includes('rect');

    if (isRectangle) {
      const [, n1, n2] = (o.match(/(\d+)x(\d+)/) || []).map(Number);
      return {
        operation: 'rect',
        n1,
        n2,
      };
    }

    const [, dimension, , n1, n2] =
      o.match(/(column|row) (x|y)=(\d+) by (\d+)/) || [];

    return {
      operation: 'rotate',
      dimension,
      n1: parseInt(n1, 10),
      n2: parseInt(n2, 10),
    };
  });

  instructions.forEach((_, i) => {
    const { operation, dimension, n1, n2 } = instructions[i];

    switch (operation) {
      case 'rect':
        addRectangle(grid, n1, n2);
        break;
      case 'rotate':
        if (dimension === 'row') {
          rotateRowWise(grid, n1, n2);
        } else {
          rotateColumnWise(grid, n1, n2);
        }
        break;
      default:
        throw new Error(`${operation} did not match any case.`);
    }
  });

  const litPixels = grid.flat().filter((o) => o === '#').length;
  success(`Part 1: ${litPixels}`);

  // Part 2 deduced from reading the letters printed in the console statement below
  let str = '';
  grid.forEach((y) => {
    y.forEach((x) => {
      str += x === '#' ? chalk.bgMagentaBright(' ') : ' ';
    });
    str += '\n';
  });
  console.log(str);

  end();
};

type TAddRectangleFn = (grid: string[][], a: number, b: number) => void;

const addRectangle: TAddRectangleFn = (grid, a, b) => {
  for (let y = 0; y < b; y++) {
    for (let x = 0; x < a; x++) {
      grid[y][x] = '#';
    }
  }
};

type TRotate = (grid: string[][], a: number, b: number) => void;

const rotateRowWise: TRotate = (grid, a, b) => {
  const originalGrid = [...grid].map((o) => [...o]);

  for (let x = 0; x < originalGrid[a].length; x++) {
    const el = originalGrid[a][x];
    grid[a][(x + b) % originalGrid[a].length] = el;
  }
};

const rotateColumnWise: TRotate = (grid, a, b) => {
  const originalGrid = [...grid].map((o) => [...o]);

  for (let y = 0; y < originalGrid.length; y++) {
    const el = originalGrid[y][a];
    grid[(y + b) % originalGrid.length][a] = el;
  }
};
