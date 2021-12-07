import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

export default async (): TDayFn => {
  const input = new Input('./2021/files/07.txt').asSingleLine
    .split(',')
    .map(Number);

  const max = Math.max(...input);

  let fuel = Infinity;

  for (let i = 1; i <= max; i++) {
    const sum = input.reduce((acc, curr) => {
      const newSum = Array(Math.abs(curr - i))
        .fill(0)
        .reduce((acc2, _, i) => {
          return acc2 + i + 1;
        }, 0);

      // Part 1
      // const newSum = Math.abs(curr - i);
      return acc + newSum;
    }, 0);

    if (sum < fuel) {
      fuel = sum;
    }
  }

  Logger.success(`Least fuel cost: ${fuel}`);
};
