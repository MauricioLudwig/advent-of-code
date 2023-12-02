import { Input, Logger } from "../@@utils";

const CUBES: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export default async () => {
  const input = new Input("./2023/files/02.txt").asArray;

  let sum2 = 0;

  const sum1 = input.reduce((acc, curr, i) => {
    const sets = curr.split(";").map((o) =>
      [...o.matchAll(/(\d+) (red|blue|green)/g)].map(([, d, c]) => ({
        digit: parseInt(d!, 10),
        color: c!,
      }))
    );

    const isPossibleGame = sets.every((o, i) =>
      o.every((x) => x.digit <= CUBES[x.color]!)
    );

    const lsOfAllCubes = sets.flat().reduce((acc, curr) => {
      if (!acc[curr.color]) {
        acc[curr.color] = [];
      }

      acc[curr.color]?.push(curr.digit);
      return acc;
    }, {} as Record<string, number[]>);

    const partSum2 = Object.entries(lsOfAllCubes).reduce(
      (acc, [, ls]) => acc * Math.max(...ls),
      1
    );
    sum2 += partSum2;

    return acc + (isPossibleGame ? i + 1 : 0);
  }, 0);

  Logger.success(`Part 1: ${sum1}`);
  Logger.success(`Part 2: ${sum2}`);
};
