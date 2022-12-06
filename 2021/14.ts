import { Divisor, Input, Logger } from '../@@utils';

export default async () => {
  const [s1, s2] = new Input('./2021/files/14.txt').AsMatrix(Divisor.NewLine);

  // Toggle for Part 1 or 2
  const isPart1 = false;

  const rules = s2!.reduce((acc, curr) => {
    const [, from, to] = curr.match(/([A-Z]{2}) -> ([A-Z]{1})/) || [];
    return {
      ...acc,
      [from!]: to!,
    };
  }, {} as Record<string, string>);

  let pairs = new Map<string, number>();
  const init = s1![0]!.split('');
  init.forEach((o, i) => {
    const next = init[i + 1];
    if (!next) {
      return;
    }

    const k = `${o}${next}`;
    const v = pairs.get(k);

    if (v) {
      pairs.set(k, v + 1);
    } else {
      pairs.set(k, 1);
    }
  });

  const steps = isPart1 ? 10 : 40;

  for (let i = 1; i <= steps; i++) {
    let pairCopy = new Map<string, number>();

    for (const [key, value] of pairs) {
      const char = rules[key]!;
      const [s1, s2] = key.split('');

      const pair1 = `${s1}${char}`;
      const pair2 = `${char}${s2}`;

      const count1 = pairCopy.get(pair1);
      pairCopy.set(pair1, count1 ? count1 + value : value);

      const count2 = pairCopy.get(pair2);
      pairCopy.set(pair2, count2 ? count2 + value : value);
    }

    pairs = pairCopy;
  }

  const group = [...pairs.keys()].reduce((acc, curr) => {
    const value = pairs.get(curr)!;
    const [s1, s2] = curr.split('');

    if (!acc[s1!]) {
      acc[s1!] = value;
    } else {
      acc[s1!] += value;
    }

    if (!acc[s2!]) {
      acc[s2!] = value;
    } else {
      acc[s2!] += value;
    }
    return acc;
  }, {} as Record<string, number>);

  const occurences = Object.values(group).map((o) => Math.ceil(o / 2));
  const max = Math.max(...occurences);
  const min = Math.min(...occurences);

  Logger.success(`Part ${isPart1 ? '1' : '2'}: ${max - min}`);
};
