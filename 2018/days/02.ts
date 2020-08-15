import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface ILetters {
  [key: string]: number;
}

export default (): void => {
  const input = getAsArray('02.txt');
  const inputLen = input.length;

  let twice = 0;
  let thrice = 0;

  input.forEach((str): void => {
    const letters: ILetters = {};

    Array.from(str).forEach((c): void => {
      if (letters.hasOwnProperty(c)) {
        letters[c] += 1;
      } else {
        letters[c] = 1;
      }
    });

    const lettersCount = Object.values(letters);

    if (lettersCount.some((l) => l === 2)) {
      twice++;
    }

    if (lettersCount.some((l) => l === 3)) {
      thrice++;
    }
  });

  const checkSum = twice * thrice;
  success(`Part 1: ${checkSum}`);

  end();

  for (let i = 0; i < inputLen; i++) {
    const currentStr = input[i];

    for (let y = i; y < inputLen; y++) {
      if (i === y) {
        continue;
      }

      const checkStr = input[y];
      let diff = 0;

      for (let z = 0, len = input[i].length; z < len; z++) {
        if (currentStr[z] !== checkStr[z]) {
          diff++;
        }

        if (diff > 1) {
          break;
        }
      }

      if (diff === 1) {
        const boxId = Array.from(currentStr)
          .map((curr, index): string => {
            return currentStr[index] === checkStr[index] ? curr : '';
          })
          .join('');

        success(`Part 2: ${boxId}`);
        break;
      }
    }
  }

  end();
};
