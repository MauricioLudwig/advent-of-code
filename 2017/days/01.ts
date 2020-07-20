import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

export default () => {
  const input = getAsSingleLine('01.txt').split('').map(Number);

  const sum1 = input.reduce((acc, curr, index, arr) => {
    const next = index === arr.length - 1 ? 0 : index + 1;

    if (curr === arr[next]) {
      return acc + curr;
    } else {
      return acc;
    }
  }, 0);

  success(`Part 1: ${sum1}`);

  const offset = input.length / 2;

  const sum2 = input.reduce((acc, curr, index, arr) => {
    const next = (index + offset) % arr.length;

    if (curr === arr[next]) {
      return acc + curr;
    } else {
      return acc;
    }
  }, 0);

  success(`Part 2: ${sum2}`);

  end();
};
