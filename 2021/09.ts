import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

type TGrid = number[][];

type TPoint = {
  x: number;
  y: number;
  value: number;
};

export default async (): TDayFn => {
  const input: TGrid = new Input('./2021/files/09.txt').asArray.map((o) =>
    o.split('').map(Number)
  );

  const lowPoints: Array<TPoint> = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y]!.length; x++) {
      const value = input[y]![x]!;
      const left = getPoint(input, x - 1, y) ?? Infinity;
      const top = getPoint(input, x, y - 1) ?? Infinity;
      const right = getPoint(input, x + 1, y) ?? Infinity;
      const bottom = getPoint(input, x, y + 1) ?? Infinity;

      if ([left, top, right, bottom].every((o) => o! > value)) {
        lowPoints.push({
          x,
          y,
          value,
        });
      }
    }
  }

  const lowPointSum = lowPoints.reduce((acc, { value }) => acc + value + 1, 0);
  Logger.success(`Part 1: ${lowPointSum}`);

  const grid = [...input.map((o) => [...o])];

  const basins = grid.reduce((acc, curr, y) => {
    const partSum = curr.reduce(
      (acc, _, x) => [...acc, traverseGridRecursion(grid, x, y)],
      [] as Array<number>
    );
    return [...acc, ...partSum];
  }, []);

  const [n1, n2, n3] = basins.sort((a, b) => b - a);
  const basinsSum = n1! * n2! * n3!;
  Logger.success(`Part 2: ${basinsSum}`);
};

const getPoint = (grid: TGrid, x: number, y: number): number | undefined => {
  const row = grid[y];

  if (!row) {
    return undefined;
  }

  return row[x];
};

const traverseGridRecursion = (grid: TGrid, x: number, y: number): number => {
  const point = getPoint(grid, x, y) ?? Infinity;

  if ([9, Infinity].some((o) => point === o)) {
    return 0;
  }

  grid[y]![x]! = Infinity;

  return (
    1 +
    [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ].reduce((acc, [x1, y1]) => acc + traverseGridRecursion(grid, x1!, y1!), 0)
  );
};
