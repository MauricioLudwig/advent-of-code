import { Input, Logger } from "../@@utils";

export default async () => {
  const ls1: number[] = [];
  const ls2: number[] = [];

  new Input("./2024/files/01.txt").asArray.forEach((o) => {
    const [n1 = 0, n2 = 0] = o.split(/\s+/).map(Number);
    ls1.push(n1);
    ls2.push(n2);
  });

  ls1.sort((a, b) => a - b);
  ls2.sort((a, b) => a - b);

  const sum1 = ls1.reduce((acc, curr, i) => {
    const partSum = curr - (ls2[i] ?? 0);
    return acc + Math.abs(partSum);
  }, 0);

  Logger.success(`Part 1: ${sum1}`);

  const sum2 = ls1.reduce((acc, curr) => {
    const occurrences = ls2.filter((o) => o === curr).length;
    return acc + curr * occurrences;
  }, 0);

  Logger.success(`Part 2: ${sum2}`);
};
