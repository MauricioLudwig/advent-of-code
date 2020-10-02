import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface IRepetition {
  [key: string]: {
    value: string;
    count: number;
  };
}

export default (): void => {
  const messages = getAsArray('06.txt');

  let repetitionCode = '';
  let reverseRepetitionCode = '';

  for (let i = 0, len = messages[0].length; i < len; i++) {
    const repetition: IRepetition = {};

    for (let y = 0; y < messages.length; y++) {
      const c = messages[y][i];

      if (repetition[c]) {
        repetition[c].count++;
      } else {
        repetition[c] = {
          value: c,
          count: 1,
        };
      }
    }

    const [max] = Object.values(repetition).sort((a, b) => b.count - a.count);
    repetitionCode += max.value;

    const [min] = Object.values(repetition).sort((a, b) => a.count - b.count);
    reverseRepetitionCode += min.value;
  }

  success(`Part 1: ${repetitionCode}`);
  success(`Part 2: ${reverseRepetitionCode}`);

  end();
};
