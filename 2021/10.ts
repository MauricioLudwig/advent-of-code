import { Input, Logger } from '../@@utils';

export default async () => {
  const input = new Input('./2021/files/10.txt').asArray;

  const pointSystem1: Record<string, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  let sum = 0;
  const incomplete: string[] = [];

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

    if (group) {
      const [, closing] = group.split('');
      sum += pointSystem1[closing!]!;
    } else {
      incomplete.push(line);
    }
  }

  Logger.success(`Part 1: ${sum}`);

  const pointSystem2: Record<string, number> = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
  };

  const scores: number[] = incomplete
    .map((line) => {
      const reverse = line.split('').reverse();
      let sum = 0;

      reverse.forEach((o) => {
        sum *= 5;
        sum += pointSystem2[o!]!;
      });

      return sum;
    })
    .sort((a, b) => a - b);

  const middleScore = scores[Math.round(scores.length - 1) / 2];
  Logger.success(`Part 2: ${middleScore}`);
};
