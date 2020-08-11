import { getAsArray } from '../input';
import { success, end } from '../utils/logger';
import { IInstruction, IRegister, Operation, Program } from './18';

export default (): void => {
  const instructions: IInstruction[] = getAsArray('23.txt').map(
    (o): IInstruction => {
      const [operation, x, y] = o.split(' ');
      return {
        operation,
        x,
        y,
      };
    }
  );

  const register: IRegister = 'abcdefgh'.split('').reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: 0,
    };
  }, {});

  const program = new Program({ ...register });

  while (true) {
    program.run2(instructions);

    if (program.index > instructions.length - 1) {
      break;
    }
  }

  success(`Part 1: ${program.operationsInvoked[Operation.mul]}`);
  end();
};
