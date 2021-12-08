import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

// TODO: refactor

export default async (): TDayFn => {
  const input = new Input('./2021/files/08.txt').asArray.map((o) => {
    const [a, b] = o.split('|');
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

  Logger.success(`Part 1: ${uniqueSegments}`);

  const outputSum = input.reduce((acc, curr) => {
    const orientation: Record<number, string | undefined> = Array(10)
      .fill(0)
      .reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: undefined,
        }),
        {}
      );

    const patterns = curr.pattern.flat();

    const segments: Record<number, string | undefined> = {
      0: undefined,
      1: findByLen(patterns, 2),
      2: undefined,
      3: undefined,
      4: findByLen(patterns, 4),
      5: undefined,
      6: undefined,
      7: findByLen(patterns, 3),
      8: findByLen(patterns, 7),
      9: undefined,
    };

    orientation[0] = findUnique(segments[7]!.split(''), new Set(segments[1]!));

    const _9 = new Set([...segments[4]!, ...segments[7]!].flat());
    const [_6_uniq, _9_word] = findUnique_2(patterns, _9, 6);
    orientation[6] = _6_uniq;
    segments[9] = _9_word;

    orientation[4] = findUnique(segments[8]!.split(''), new Set(segments[9]!));

    const _3 = new Set(
      [...segments[7]!, orientation[0]!, orientation[6]!].flat()
    );
    const [_3_uniq, _3_word] = findUnique_2(patterns, _3, 5);
    orientation[3] = _3_uniq;
    segments[3] = _3_word;

    const _5 = new Set([...segments[3]!, orientation[4]]);
    const [_1_uniq, _5_word] = findUnique_2(patterns, _5, 5);
    orientation[1] = _1_uniq;
    segments[5] = _5_word;

    const _6 = new Set([
      orientation[0]!,
      orientation[1]!,
      orientation[3]!,
      orientation[4]!,
      orientation[6]!,
    ]);
    const [_5_uniq, _6_word] = findUnique_2(patterns, _6, 6);
    orientation[5] = _5_uniq;
    segments[6] = _6_word;

    const _2 = new Set([
      orientation[0]!,
      orientation[3]!,
      orientation[4]!,
      orientation[6]!,
    ]);
    const [_2_uniq, _2_word] = findUnique_2(patterns, _2, 5);
    orientation[2] = _2_uniq;
    segments[2] = _2_word;

    const _0 = [
      orientation[0],
      orientation[1],
      orientation[2],
      orientation[4],
      orientation[5],
      orientation[6],
    ];
    const [_0_word] = patterns.filter(
      (o) => o.split('').sort().join('') === _0.sort().join('')
    );
    segments[0] = _0_word!;

    const sum = curr.output.reduce((a, c) => {
      const k = c.split('');
      let s = '';

      Object.keys(segments).forEach((ke) => {
        const segment = segments[parseInt(ke, 10)]!;

        if (
          segment.split('').every((o) => k.includes(o)) &&
          segment.length == k.length
        ) {
          s = ke;
        }
      });

      return (a += s);
    }, '');

    return acc + parseInt(sum, 10);
  }, 0);

  Logger.success(`Part 2: ${outputSum}`);
};

const findByLen = (pattern: string[], len: number): string => {
  const match = pattern.filter((o) => o.length === len);
  return match[0]!;
};

const findUnique = (arr: string[], set: Set<string>): string => {
  const compare = Array.from(set);
  const unique = arr
    .filter((o) => !compare.includes(o))
    .filter((o) => o.length === 1);

  const u = unique.filter((o) => o.length === 1);

  return u[0]!;
};

const findUnique_2 = (patterns: string[], set: Set<string>, len: number) => {
  const compare = Array.from(set);

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i]!.split('');
    const matches = pattern.filter((o) => !compare.includes(o));

    if (matches.length === 1 && pattern.length == len) {
      return [matches[0]!, pattern.join('')];
    }
  }

  throw new Error();
};
