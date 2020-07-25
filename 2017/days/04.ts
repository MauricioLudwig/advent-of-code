import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

export default (): void => {
  const input = getAsArray('04.txt');

  const validPassphrases1 = input.reduce((acc, curr): number => {
    const words = curr.split(' ');

    if (new Set(words).size === words.length) {
      return acc + 1;
    }

    return acc;
  }, 0);

  success(`Part 1: ${validPassphrases1}`);

  const validPassphrases2 = input.reduce((acc, curr): number => {
    const words = curr.split(' ');

    const duplicates = words.some((word1, index1): boolean => {
      const sortedWord1 = word1.split('').sort().join('');
      return words.some((word2, index2): boolean => {
        const sortedWord2 = word2.split('').sort().join('');
        return index1 !== index2 && sortedWord1 === sortedWord2;
      });
    });

    if (duplicates) {
      return acc;
    }

    return acc + 1;
  }, 0);

  success(`Part 2: ${validPassphrases2}`);

  end();
};
