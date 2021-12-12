import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

type TPath = {
  from: string;
  to: string;
};

type TSystem = {
  path: string[];
  current: string;
};

export default async (): TDayFn => {
  const input: TPath[] = new Input('./2021/files/12.txt').asArray.map((o) => {
    const [, from, to] = o.match(/(.+)\-(.+)/) || [];
    return { from: from!, to: to! };
  });

  let paths: TSystem[] = [
    {
      path: ['start'],
      current: 'start',
    },
  ];

  const finalPaths: TSystem[] = [];

  while (paths.length > 0) {
    const newPaths: TSystem[] = [];

    for (let y = 0; y < paths.length; y++) {
      const { path, current } = paths[y]!;

      if (current === 'end') {
        finalPaths.push({
          path: [...path],
          current,
        });
        continue;
      }

      const nexts: string[] = [];
      nexts.push(...input.filter((o) => o.from === current).map((o) => o.to));
      nexts.push(...input.filter((o) => o.to === current).map((o) => o.from));

      const eligibleNexts = nexts.filter((o) => {
        const isLowerCase = /[a-z]/.test(o);
        const isNotRepeat = !path.includes(o);
        return !isLowerCase || (isLowerCase && isNotRepeat);
      });

      eligibleNexts.forEach((o) => {
        newPaths.push({
          path: [...path, o],
          current: o,
        });
      });
    }

    paths = [
      ...newPaths.map((o) => ({
        ...o,
      })),
    ];
  }

  Logger.success(`Part 1: ${finalPaths.length}`);
};
