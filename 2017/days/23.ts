import { getAsArray } from '../input';
import { success, end } from '../utils/logger';
import { Operation, Instruction, Register, run } from './18';

export default (): void => {
  const input = getAsArray('23.txt');

  const instructions = input.map(
    (o): Instruction => {
      const [operation, x, y] = o.split(' ');
      return {
        operation,
        x,
        y,
      };
    }
  );

  const register: Register = 'abcdefgh'.split('').reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: 0,
    };
  }, {});

  let mulInstructions = 0;

  for (let i = 0; i < instructions.length; ) {
    if (instructions[i].operation === Operation.mul) {
      mulInstructions++;
    }

    const [offset, , recover] = run(instructions[i], register);

    if (recover) {
      break;
    }

    i += offset === 0 ? 1 : offset;
  }

  success(`Part 1: ${mulInstructions}`);
  end();
};
