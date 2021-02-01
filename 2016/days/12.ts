import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

type TInstruction = {
  operation: string;
  r1: string;
  r2?: string;
};

export default (): void => {
  const instructions: Array<TInstruction> = getAsArray('12.txt').map((o) => {
    const [, operation, r1, r2] =
      o.match(/(cpy|inc|dec|jnz) ([a-z0-9-]+) ?([a-z0-9\-]+)?/) || [];
    return {
      operation,
      r1,
      r2,
    };
  });

  const register1 = generateRegister();
  run(register1, instructions);
  success(`Part 1: ${register1.a}`);

  const register2 = generateRegister();
  register2.c = 1;
  run(register2, instructions);
  success(`Part 2: ${register2.a}`);

  end();
};

const generateRegister = () =>
  'abcd'.split('').reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: 0,
    }),
    {} as Record<string, number>
  );

type TRun = (
  register: Record<string, number>,
  instructions: Array<TInstruction>
) => void;

const run: TRun = (register, instructions) => {
  for (let i = 0; i < instructions.length; i) {
    const { operation, r1, r2 } = instructions[i];
    const val = isNumber(r1) ? parseInt(r1, 10) : register[r1];

    switch (operation) {
      case 'cpy':
        register[r2 as string] = val;
        break;
      case 'inc':
        register[r1]++;
        break;
      case 'dec':
        register[r1]--;
        break;
      case 'jnz':
        if (val !== 0) {
          i += parseInt(r2 as string, 10);
          continue;
        }
        break;
      default:
        throw new Error(`Operation does not match any cases.`);
    }

    i++;
  }
};

const isNumber = (str: any): str is number => /-?\d+/.test(str);
