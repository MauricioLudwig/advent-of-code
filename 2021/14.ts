import { TDayFn } from '../@@types';
import { Divisor, Input, Logger } from '../@@utils';

export default async (): TDayFn => {
  const [s1, s2] = new Input('./2021/files/14.txt').AsMatrix(Divisor.NewLine);
  const pairs = s2!.map((o) => {
    const [, from, to] = o.match(/([A-Z]{2}) -> ([A-Z]{1})/) || [];
    return {
      from: from!,
      to: to!,
    };
  });

  let polymer: string[] = s1![0]!.split('');

  const steps = 40;

  for (let i = 1; i <= steps; i++) {
    const polymerCopy: string[] = [];

    for (let y = 0; y < polymer.length; y++) {
      const pair = polymer.slice(y, 2 + y);

      if (pair.length < 2) {
        polymerCopy.push(pair[0]!);
        continue;
      }

      const { to } = pairs.find((o) => o.from === pair.join('')) || {};

      if (to === undefined) {
        console.log('WTF');
      }

      polymerCopy.push(pair[0]!, to!);
    }

    polymer = [...polymerCopy];
    console.log('step', i);
    // console.log(polymer.join(''));
  }

  const x = polymer.reduce((acc, curr) => {
    if (!acc[curr]) {
      acc[curr] = 1;
      return acc;
    }

    acc[curr]++;
    return acc;
  }, {} as Record<string, number>);

  const max = Math.max(...Object.values(x));
  const min = Math.min(...Object.values(x));

  console.log(max - min);

  console.log('end');
};
