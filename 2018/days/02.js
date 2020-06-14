import { getAsArray } from '../input/index.js';
import { success, end } from '../utils/logger.js';

export default () => {
  const input = getAsArray('02.txt');
  const inputLen = input.length;

  // Part 1
  let thrice = 0;
  let twice = 0;

  input.forEach(str => {
    const letters = {};

    Array.from(str).forEach(char => {
      if (letters.hasOwnProperty(char)) {
        letters[char] = letters[char] + 1;
      } else {
        letters[char] = 1;
      }
    });

    const lettersCount = Object.values(letters);

    if (lettersCount.some(l => l === 2)) {
      twice++;
    }

    if (lettersCount.some(l => l === 3)) {
      thrice++;
    }
  });

  const checkSum = thrice * twice;
  success(`Part 1: ${checkSum}`);

  // Part 2
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
          .map((curr, index) => currentStr[index] === checkStr[index] ? curr : '')
          .join('');

        success(`Part 2: ${boxId}`);
        break;
      }
    }
  }

  end();
};
