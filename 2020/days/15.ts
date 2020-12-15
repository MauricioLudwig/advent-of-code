import { performance } from 'perf_hooks';
import { getAsSingleLine } from '../input';
import { success, logPerformance } from '../utils/logger';

export default async (): Promise<void> => {
  const input = getAsSingleLine('15.txt').split(',').map(Number);
  success(`Part 1: ${memoryGame(input, 2020)}`);

  const t1 = performance.now();
  success(`Part 2: ${memoryGame(input, 30e6)}`);
  const t2 = performance.now();
  logPerformance(t2, t1);
};

export const memoryGame = (
  input: Array<number>,
  lastNumber: number
): number => {
  const spokenNumbers = new Map();
  input.forEach((o, i) => spokenNumbers.set(o, [i + 1]));

  const initialLength = spokenNumbers.size;
  let lastSpokenNumber = initialLength;

  for (let i = 1; i <= lastNumber - initialLength; i++) {
    const turns = spokenNumbers.get(lastSpokenNumber);

    if (turns?.length > 1) {
      const [n2, n1] = turns;
      lastSpokenNumber = n2 - n1;
    } else {
      lastSpokenNumber = 0;
    }

    const indices = spokenNumbers.get(lastSpokenNumber);

    if (indices) {
      indices.unshift(i + initialLength);

      if (indices.length > 2) {
        indices.pop();
      }
    } else {
      spokenNumbers.set(lastSpokenNumber, [i + initialLength]);
    }
  }

  return lastSpokenNumber;
};
