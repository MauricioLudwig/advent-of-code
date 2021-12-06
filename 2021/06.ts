import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

export default async (): TDayFn => {
  const input = new Input('./2021/files/06.txt').asSingleLine
    .split(',')
    .map(Number);

  let count = initFishCount();

  input.forEach((o) => {
    count[o]++;
  });

  const numberOfDays = 256; // 80 for Part 1

  for (let i = 0; i < numberOfDays; i++) {
    const nextCount = initFishCount();

    for (const [key, value] of Object.entries(count)) {
      const k = parseInt(key, 10);

      if (value === 0) {
        continue;
      } else if (k === 0) {
        nextCount[8] = value;
        nextCount[6] = value;
      } else {
        nextCount[k - 1] += value;
      }
    }

    count = { ...nextCount };
  }

  const sum = Object.values(count).reduce((acc, curr) => acc + curr, 0);
  Logger.success(`Sum: ${sum}`);
};

const initFishCount = (): Record<string, number> =>
  Array(9)
    .fill(0)
    .reduce(
      (acc, _, i) => ({
        ...acc,
        [i]: 0,
      }),
      {} as Record<number, number>
    );
