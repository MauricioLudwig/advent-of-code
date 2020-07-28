import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

enum Operation {
  snd = 'snd',
  set = 'set',
  add = 'add',
  mul = 'mul',
  mod = 'mod',
  rcv = 'rcv',
  jgz = 'jgz',
}

interface Instruction {
  operation: string;
  x: string;
  y?: string;
}

interface Register {
  [key: string]: number;
}

export default (): void => {
  const instructions = getAsArray('18.txt').map(
    (o): Instruction => {
      const [operation, x, y] = o.split(' ');
      return {
        operation,
        x,
        y,
      };
    }
  );

  const register: Register = instructions
    .map((o): string => o.x)
    .reduce((acc, curr): Register => {
      return {
        ...acc,
        [curr]: 0,
      };
    }, {});

  const sounds: number[] = [];

  for (let i = 0; i < instructions.length; ) {
    const [offset, sound, recover] = run(instructions[i], register);

    if (sound) {
      sounds.push(sound);
    }

    if (recover) {
      break;
    }

    i += offset === 0 ? 1 : offset;
  }

  success(`Part 1: ${sounds.pop()}`);
  end();
};

type Run = (
  instruction: Instruction,
  register: Register
) => [number, number | null, boolean];

const run: Run = ({ operation, x, y }, register) => {
  let offset = 0;
  let sound: number | null = null;
  let recover = false;

  let n = 0;

  if (y) {
    n = isNaN(y as any) ? register[y] : parseInt(y, 10);
  }

  switch (operation) {
    case Operation.snd:
      sound = register[x];
      break;
    case Operation.set:
      register[x] = n;
      break;
    case Operation.add:
      register[x] += n;
      break;
    case Operation.mul:
      register[x] *= n;
      break;
    case Operation.mod:
      register[x] %= n;
      break;
    case Operation.rcv:
      if (register[x] !== 0) {
        recover = true;
      }
      break;
    case Operation.jgz:
      if ((isNaN(x as any) ? register[x] : parseInt(x, 10)) > 0) {
        offset = n;
      }
      break;
    default:
      throw new Error(`No case matched: ${operation}`);
  }

  return [offset, sound, recover];
};
