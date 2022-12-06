import { Input, Logger } from '../@@utils';

type TPath = {
  from: string;
  to: string;
};

type TSystem = {
  path: string[];
  current: string;
};

export default async () => {
  const input: TPath[] = new Input('./2021/files/12.txt').asArray.map((o) => {
    const [, from, to] = o.match(/(.+)\-(.+)/) || [];
    return { from: from!, to: to! };
  });

  // Toggle for Part 1 or 2
  const isPart1 = true;

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
        if (o === 'start') {
          return false;
        }

        const isLowerCase = /[a-z]/.test(o);
        const isNotRepeat = !path.includes(o);
        const canRepeatTwice =
          path.includes(o) &&
          path
            .filter((o) => /[a-z]/.test(o))
            .every((o) => {
              return path.filter((p) => p === o).length < 2;
            });
        const canRepeat = isLowerCase && (isNotRepeat || canRepeatTwice);

        if (isPart1) {
          return !isLowerCase || (isLowerCase && isNotRepeat);
        } else {
          return !isLowerCase || canRepeat;
        }
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

  Logger.success(`Part ${isPart1 ? '1' : '2'}: ${finalPaths.length}`);
};
