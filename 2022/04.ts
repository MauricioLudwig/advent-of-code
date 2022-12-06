import { Input, Logger } from "../@@utils";

const getRange = (low: number, high: number): Array<number> =>
  [...Array(high - low + 1)].map((_, i) => i + low);

const readDigits = (s = ""): [number, number] => {
  const [, d1 = "", d2 = ""] = s.match(/(\d+)-(\d+)/) || [];
  return [parseInt(d1, 0), parseInt(d2, 0)];
};

export default async () => {
  const input = new Input("./2022/files/04.txt").asArray.map((o) =>
    o.split(",").map((nums) => {
      const [d1, d2] = readDigits(nums);
      return {
        low: d1,
        high: d2,
        range: getRange(d1, d2),
      };
    })
  );

  const pairs1 = input.reduce((acc, curr) => {
    const [s1, s2] = curr;
    const seq = new Set([...(s1?.range ?? []), ...(s2?.range ?? [])]);
    const maxLen = Math.max(s1?.range.length ?? 0, s2?.range.length ?? 0);
    return acc + (seq.size === maxLen ? 1 : 0);
  }, 0);

  Logger.success(`Part 1: ${pairs1}`);

  const pairs2 = input.reduce((acc, curr) => {
    const [s1, s2] = curr;
    const overlaps = s1?.range.some((o) => s2?.range.includes(o));
    return acc + (overlaps ? 1 : 0);
  }, 0);

  Logger.success(`Part 2: ${pairs2}`);
};
