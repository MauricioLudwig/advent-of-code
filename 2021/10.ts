import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

export default async (): TDayFn => {
  const input = new Input('./2021/files/10.txt').asArray;

  const points: Record<string, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    let line = input[i]!;

    while (true) {
      line = line.replace('()', '');
      line = line.replace('[]', '');
      line = line.replace('{}', '');
      line = line.replace('<>', '');

      if (!/(\(\)|\[\]|\<\>|\{\})/.test(line)) {
        break;
      }
    }

    const [, group] = line.match(/([\(\[\{\<][\)\]\}\>])/) || [];
    // corrupted
    if (group) {
      const [, closing] = group.split('');
      sum += points[closing!]!;
    }
  }

  console.log('sum', sum);
  console.log('end');
};
