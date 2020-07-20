import { getAsNumbersArray } from '../input';
import { success, end } from '../utils/logger';

export default () => {
  const input = getAsNumbersArray('05.txt');

  const iterations1 = jumpProgram([...input], () => 1);
  success(`Part 1: ${iterations1}`);

  const iterations2 = jumpProgram([...input], (offset) => {
    return offset >= 3 ? -1 : 1;
  });
  success(`Part 2: ${iterations2}`);

  end();
};

type CalcOffsetFN = (offset: number) => number;

const jumpProgram = (input: number[], calcOffset: CalcOffsetFN) => {
  let iterations = 0;
  let index = 0;

  while (true) {
    if (input[index] === undefined) {
      break;
    }

    const offset = input[index];
    input[index] = offset + calcOffset(offset);
    index += offset;
    iterations++;
  }

  return iterations;
};
