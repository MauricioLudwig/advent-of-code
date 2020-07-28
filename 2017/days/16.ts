import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

enum Dance {
  Spin,
  Exchange,
  Partner,
}

interface Sequence {
  dance: Dance;
  arg1: string | number;
  arg2?: string | number;
}

export default (): void => {
  const input = getAsSingleLine('16.txt')
    .split(',')
    .map(
      (o): Sequence => {
        const sequence = o.match(/(s|x|p)(\d+|\w+)\/?(\d+|\w+)?/);

        if (!sequence) {
          throw new Error('sequence was undefined');
        }

        const [, dance, arg1, arg2] = sequence;

        return {
          dance: getDance(dance),
          arg1,
          arg2,
        };
      }
    );

  let programs1 = 'abcdefghijklmnop'.split('');

  input.forEach((o): void => {
    programs1 = Array.from(dance(o, programs1));
  });

  success(`Part 1: ${programs1.join('')}`);

  let programs2 = 'abcdefghijklmnop'.split('');

  /*
    Number of iterations derived from looking at the pattern of sequence changes between each iteration.
    The initial sequence 'abcdefghijklmnop' repeats every 48 times.
    So instead of iterating 1 billion times we simply take the modulus of 1 billion (1000000000) divided by 48
  */

  const iterations = 1000000000 % 48;

  for (let i = 1; i <= iterations; i++) {
    input.forEach((o): void => {
      programs2 = Array.from(dance(o, programs2));
    });
  }

  success(`Part 2: ${programs2.join('')}`);

  end();
};

const dance = (sequence: Sequence, programs: string[]): string[] => {
  const { arg1, arg2, dance } = sequence;

  switch (dance) {
    case Dance.Spin:
      const subLs = programs.splice((arg1 as number) * -1, arg1 as number);
      programs = [...subLs, ...programs];
      break;
    case Dance.Exchange:
      const tempEx = programs[arg1 as number];
      programs[arg1 as number] = programs[arg2 as number];
      programs[arg2 as number] = tempEx;
      break;
    case Dance.Partner:
      const i1 = programs.indexOf(arg1 as string);
      const i2 = programs.indexOf(arg2 as string);
      const tempPa = programs[i1];
      programs[i1] = programs[i2];
      programs[i2] = tempPa;
      break;
  }

  return programs;
};

const getDance = (dance: string): Dance => {
  switch (dance) {
    case 's':
      return Dance.Spin;
    case 'x':
      return Dance.Exchange;
    case 'p':
      return Dance.Partner;
    default:
      throw new Error(`No case matched: ${dance}`);
  }
};
