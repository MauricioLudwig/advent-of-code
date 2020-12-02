import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const pass = getAsArray('02.txt').map((o) => {
    const match = o.match(/(\d+)-(\d+) (\w{1}): (\w+)/);

    if (!match) {
      throw new Error('No match was found.');
    }

    const [, d1, d2, letter, sentence] = match;

    return {
      d1: parseInt(d1, 10),
      d2: parseInt(d2, 10),
      letter,
      sentence,
    };
  });

  const valid1 = pass.reduce((acc, curr) => {
    const { d1, d2, letter, sentence } = curr;
    const occurrence = sentence.split('').filter((o) => o === letter).length;

    if (d1 <= occurrence && occurrence <= d2) {
      return acc + 1;
    }

    return acc;
  }, 0);

  success(`Part 1: ${valid1}`);

  const valid2 = pass.reduce((acc, curr) => {
    const { d1, d2, letter, sentence } = curr;

    let count = 0;

    if (sentence[d1 - 1] === letter) {
      count++;
    }

    if (sentence[d2 - 1] === letter) {
      count++;
    }

    return count === 1 ? acc + 1 : acc;
  }, 0);

  success(`Part 2: ${valid2}`);
};
