import { getAsNumbersArray } from '../input/index.js';
import { success, end } from '../utils/logger.js';

export default () => {
  const input = getAsNumbersArray('01.txt');

  // Part 1
  const freqSum = input.reduce((acc, curr) => acc + curr, 0);
  success(`Part 1: ${freqSum}`);

  // Part 2
  let loop = true;
  let currentFreq = 0;
  const frequencies = [];

  while (loop) {
    for (let i = 0; i < input.length; i++) {
      currentFreq += input[i];

      if (frequencies.includes(currentFreq)) {
        loop = false;
        break;
      }

      frequencies.push(currentFreq);
    };
  };

  success(`Part 2: ${currentFreq}`);
  end();
};
