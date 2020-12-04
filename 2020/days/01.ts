import { getAsNumbersArray } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const numbers = getAsNumbersArray('01.txt');
  const numLen = numbers.length;

  for (let i = 0; i < numLen; i++) {
    const n1 = numbers[i];

    for (let y = i + 1; y < numLen; y++) {
      const n2 = numbers[y];

      for (let z = y + 1; z < numLen; z++) {
        const n3 = numbers[z];

        if (n1 + n2 + n3 === 2020) {
          success(`Part 2: ${n1 * n2 * n3}`);
        }
      }

      if (n1 + n2 === 2020) {
        success(`Part 1: ${n1 * n2}`);
      }
    }
  }
};
