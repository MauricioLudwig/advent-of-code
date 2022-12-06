import { Divisor, Input, Logger } from "../@@utils";

export default async () => {
  const input = new Input("./2022/files/01.txt").AsMatrix(Divisor.NewLine);
  const counts = input.map((group) =>
    group.reduce((acc, curr) => acc + parseInt(curr, 10), 0)
  );

  Logger.success(`Part 1: ${Math.max(...counts)}`);

  counts.sort((a, b) => b - a);
  const topThree = counts.slice(0, 3).reduce((acc, curr) => acc + curr, 0);

  Logger.success(`Part 2: ${topThree}`);
};
