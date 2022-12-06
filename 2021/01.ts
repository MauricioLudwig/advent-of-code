import { Input, Logger } from '../@@utils';

export default async () => {
  const input = new Input('./2021/files/01.txt').asNumbersArray;

  (() => {
    let prev = Infinity;
    let count = 0;

    for (let i = 0; i < input.length; i++) {
      const curr = input[i]!;

      if (curr > prev) {
        count++;
      }

      prev = curr;
    }

    Logger.success(`Part 1: ${count}`);
  })();

  (() => {
    let prev = Infinity;
    let count = 0;

    for (let i = 0; i < input.length; i++) {
      const n1 = input[i];
      const n2 = input[i + 1];
      const n3 = input[i + 2];

      if ([n1, n2, n3].some((o) => !o)) {
        break;
      }

      const windowSum = [n1!, n2!, n3!].reduce((acc, curr) => acc + curr, 0);

      if (windowSum > prev) {
        count++;
      }

      prev = windowSum;
    }

    Logger.success(`Part 2: ${count}`);
  })();
};
