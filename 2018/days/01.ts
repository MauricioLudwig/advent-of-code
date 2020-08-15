import { performance } from 'perf_hooks';
import { getAsNumbersArray } from '../input';
import { success, end, logPerformance } from '../utils/logger';

export default (): void => {
  const input = getAsNumbersArray('01.txt');

  const freqSum = input.reduce((acc, curr): number => acc + curr, 0);
  success(`Part 1: ${freqSum}`);

  let loop = true;
  let currentFreq = 0;
  const frequencies: number[] = [];
  const t1 = performance.now();

  while (loop) {
    for (let i = 0; i < input.length; i++) {
      currentFreq += input[i];

      if (frequencies.includes(currentFreq)) {
        loop = false;
        break;
      }

      frequencies.push(currentFreq);
    }
  }

  const t2 = performance.now();

  logPerformance(t2, t1);
  success(`Part 2: ${currentFreq}`);

  end();
};
