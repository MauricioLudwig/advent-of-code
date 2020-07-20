import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

export default () => {
  const input = getAsArray('02.txt').map((o) => o.split('\t').map(Number));

  const checkSum1 = input.reduce((acc, curr) => {
    const max = Math.max(...curr);
    const min = Math.min(...curr);
    return acc + (max - min);
  }, 0);

  success(`Part 1: ${checkSum1}`);

  const checkSum2 = input.reduce((acc, curr) => {
    let num = 0;
    let abort = false;
    const numbers = curr.sort((a, b) => b - a);

    for (let i = 0; i < numbers.length - 1; i++) {
      for (let y = i + 1; y < numbers.length; y++) {
        if (numbers[i] % numbers[y] === 0) {
          num = numbers[i] / numbers[y];
          abort = true;
          break;
        }
      }

      if (abort) {
        break;
      }
    }

    return acc + num;
  }, 0);

  success(`Part 2: ${checkSum2}`);

  end();
};
