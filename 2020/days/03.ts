import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const grid = getAsArray('03.txt').map((o) => o.repeat(150));

  const treesSum = [
    [3, 1],
    [1, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ].reduce((acc, [x, y]) => acc * traverse(grid, x, y), 1);

  success(`Part 1: ${traverse(grid, 3, 1)}`);
  success(`Part 2: ${treesSum}`);
};

export const traverse = (
  grid: string[],
  xOffset: number,
  yOffset: number
): number => {
  let x = 0;
  let y = 0;
  let trees = 0;

  while (true) {
    x += xOffset;
    y += yOffset;

    if (!grid[y]) {
      break;
    }

    if (grid[y][x] === '#') {
      trees++;
    }
  }

  return trees;
};
