import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

export default async (): TDayFn => {
  const input = new Input('./2021/files/08.txt').asArray.map((o) => {
    const [a, b] = o.split('|');
    console.log(a?.split(' '), b?.split(' '));
    return {
      pattern: a!.split(' ').filter((o) => o !== ''),
      output: b!.split(' ').filter((o) => o !== ''),
    };
  });

  const digitCom: Record<number, number> = {
    0: 6,
    1: 2,
    2: 5,
    3: 5,
    4: 4,
    5: 5,
    6: 6,
    7: 3,
    8: 7,
    9: 6,
  };

  const outputs = input.map((o) => o.output).flat();

  const uniqueSegments = [1, 4, 7, 8].reduce((acc, curr) => {
    const k = digitCom[curr]!;
    return acc + outputs.filter((o) => o.length === k).length;
  }, 0);

  console.log(uniqueSegments);

  console.log('end');
};
