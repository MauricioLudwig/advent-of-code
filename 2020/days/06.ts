import { getAsMatrix, Divisor } from '../input';
import { success } from '../utils/logger';
import { arrangeByOccurrence } from '../utils/array-methods';

export default (): void => {
  const input = getAsMatrix('06.txt', Divisor.NewLine);

  (() => {
    const count = input.reduce(
      (acc, curr) => acc + new Set(Array.from(collapseArr(curr))).size,
      0
    );
    success(`Part 1: ${count}`);
  })();

  (() => {
    const count = input.reduce(
      (acc, curr) =>
        acc +
        Object.values(arrangeByOccurrence(collapseArr(curr))).filter(
          (o) => o === curr.length
        ).length,
      0
    );
    success(`Part 2: ${count}`);
  })();
};

const collapseArr = (arr: string[]): string[] =>
  arr.map((o) => o.split('')).flat();
