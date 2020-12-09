import { getAsNumbersArray } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const input = getAsNumbersArray('09.txt');
  const preamble = 25;

  let invalidNum: number | null = null;

  for (let i = preamble; i < input.length; i++) {
    const startIndex = i - preamble;
    const subArr = input.slice(startIndex, preamble + startIndex);
    const n = input[i];

    if (!isSumOfTwoNumbers(subArr, n)) {
      invalidNum = n;
      break;
    }
  }

  if (!invalidNum) {
    throw new Error('No invalid number found.');
  }

  let range: number[] = [];
  let exit = false;

  for (let i = 0; i < input.length; i++) {
    range = [input[i]];

    for (let y = i + 1; y < input.length; y++) {
      range.push(input[y]);

      const sum = range.reduce((acc, curr) => acc + curr, 0);

      if (sum === invalidNum) {
        exit = true;
        break;
      }
    }

    if (exit) {
      break;
    }
  }

  const min = Math.min(...range);
  const max = Math.max(...range);

  success(`Part 1: ${invalidNum}`);
  success(`Part 2: ${min + max}`);
};

const isSumOfTwoNumbers = (numArr: number[], checkAgainst: number): boolean => {
  let valid = false;
  let exit = false;

  for (let i = 0; i < numArr.length; i++) {
    for (let y = i; y < numArr.length; y++) {
      if (numArr[i] + numArr[y] === checkAgainst && numArr[i] !== numArr[y]) {
        valid = true;
        exit = true;
        break;
      }
    }

    if (exit) {
      break;
    }
  }

  return valid;
};
