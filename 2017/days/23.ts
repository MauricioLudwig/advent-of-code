import { getAsArray } from '../input';
import { success, end } from '../utils/logger';
import { IInstruction, IRegister, Operation, Program } from './18';

export default async (): Promise<void> => {
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

  const programA = new Program({ ...register });

  while (true) {
    programA.run2(instructions);

    if (programA.index > instructions.length - 1) {
      break;
    }
  }

  success(`Part 1: ${programA.operationsInvoked[Operation.mul]}`);

  let h = 0;
  let b = 67 * 100 + 100000;
  let c = b + 17000;
  let offset = 17;

  for (let i = b; i <= c; i += offset) {
    let d = 2; // skip 1 since a prime number is always divisible by 1
    let isPrime = true;

    // skip d === i since a prime number is always divisible by itself
    while (d < i) {
      if (i % d === 0) {
        isPrime = false;
        break;
      }

      d++;
    }

    if (!isPrime) {
      h++;
    }
  }

  success(`Part 2: ${h}`);

  end();
};
