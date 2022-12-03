import { TDayFn } from "../@@types";
import { Input, Logger } from "../@@utils";

const getPrio = (s: string): number =>
  s.charCodeAt(0) - (/[A-Z]/.test(s) ? 38 : 96);

const findCommons = (g1: Array<string>, g2: Array<string>) =>
  g1.filter((o1) => g2.some((o2) => o1 === o2));

export default async (): TDayFn => {
  const input = new Input("./2022/files/03.txt").asArray;

  const sum1 = input.reduce((acc, curr) => {
    const right = curr.split("");
    const left = right.splice(0, Math.ceil(curr.length / 2));
    const [uniq = ""] = findCommons(left, right);
    return acc + getPrio(uniq);
  }, 0);

  Logger.success(`Part 1: ${sum1}`);

  let sum2 = 0;

  for (let i = 0; i < input.length; i += 3) {
    const [g1 = [], g2 = [], g3 = []] = input
      .slice(i, i + 3)
      .map((o) => o.split(""));
    const uniqs = findCommons(g1, g2);
    const [uniq = ""] = findCommons(uniqs, g3);
    sum2 += getPrio(uniq);
  }

  Logger.success(`Part 2: ${sum2}`);
};
