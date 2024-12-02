import { Input, Logger } from "../@@utils";

const isValidLevel = (level: number[]): boolean =>
  level.every((o, i, arr) => {
    const next = arr[i + 1] ?? o + 1;
    const diff = next - o;
    return diff >= 1 && diff <= 3;
  });

export default async () => {
  const input = new Input("./2024/files/02.txt").asArray.map((o) =>
    o.split(/\s+/).map(Number)
  );

  const sum1 = input.filter((level) => {
    const reverse = [...level].reverse();
    return [level, reverse].some((arr) => isValidLevel(arr));
  }).length;

  Logger.success(`Part 1: ${sum1}`);

  const sum2 = input.filter((level) => {
    const reverse = [...level].reverse();

    return [level, reverse].some((arr) => {
      let validLevels = 0;

      for (let i = 0; i < arr.length; i++) {
        const slicedArr = arr.filter((_, j) => j !== i);

        if (isValidLevel(slicedArr)) {
          validLevels++;
          break;
        }
      }

      return validLevels;
    });
  }).length;

  Logger.success(`Part 2: ${sum2}`);
};
