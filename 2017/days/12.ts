import { getAsArray } from '../input';
import { success, end } from '../utils/logger';
import {
  compareSetEquality,
  compareArrayEquality,
} from '../utils/helper-functions';

interface Input {
  origin: number;
  next: number[];
}

export default (): void => {
  const input = getAsArray('12.txt').map(
    (o): Input => {
      const [, origin, next] = o.match(/(\d+) <-> (.+)/) ?? [];

      return {
        origin: parseInt(origin, 10),
        next: next.split(',').map(Number),
      };
    }
  );

  const collection = new Set<number>();
  traverseProgram(undefined, collection, input);
  success(`Part 1: ${collection.size}`);

  const collections = input
    .map((o): number => o.origin)
    .map((o): Set<number> => traverseProgram(o, new Set<number>(), input));

  const distinctLs: number[][] = [];

  const groups = collections.reduce((acc, curr, index): number => {
    const x = Array.from(curr).sort((a, b) => a - b);

    const unique = !collections.some(
      (c, i): boolean => compareSetEquality(curr, c) && index !== i
    );

    const distinct = !distinctLs.some((o): boolean =>
      compareArrayEquality(o, x)
    );

    if (unique || distinct) {
      distinctLs.push(x);
    }

    return acc + (unique || distinct ? 1 : 0);
  }, 0);
  success(`Part 2: ${groups}`);

  end();
};

const traverseProgram = (base = 0, collection: Set<number>, input: Input[]) => {
  collection.add(base);
  const next = input.find((o): boolean => o.origin === base)?.next ?? [];

  if (next.length === 0) {
    return collection;
  }

  next.forEach((o): void => {
    if (!collection.has(o)) {
      traverseProgram(o, collection, input);
    }
  });

  return collection;
};
