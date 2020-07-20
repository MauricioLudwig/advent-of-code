import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

export default () => {
  const input = getAsSingleLine('06.txt').split('\t').map(Number);
  const bankCombinations: string[] = [input.join('')];

  let steps = 0;
  let cycles = 0;

  while (true) {
    const max = Math.max(...input);
    let maxIndex = input.indexOf(max);
    input[maxIndex] = 0;

    let index = maxIndex + 1;

    for (let i = 0; i < max; i++) {
      if (input[index] === undefined) {
        index = 0;
      }

      input[index] = input[index] + 1;
      index++;
    }

    const newCombination = input.join('');
    steps++;

    if (bankCombinations.some((o) => o === newCombination)) {
      cycles = steps - bankCombinations.indexOf(newCombination);
      break;
    }

    bankCombinations.push(newCombination);
  }

  success(`Part 1: ${steps}`);
  success(`Part 2: ${cycles}`);

  end();
};
