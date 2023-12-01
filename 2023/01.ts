import { Input, Logger } from "../@@utils";

const NUM_STRING: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;

export default async () => {
  const input = new Input("./2023/files/01.txt").asArray;

  part1(input);
  part2(input);
};

const part1 = (input: string[]): void => {
  const sum1 = input.reduce((acc, curr) => {
    const nums = curr
      .split("")
      .filter((o) => /(\d)+/.test(o))
      .map(Number);

    const comb = [nums.at(0), nums.at(-1)].join("");
    return acc + parseInt(comb, 10);
  }, 0);

  Logger.success(`Part 1: ${sum1}`);
};

const part2 = (input: string[]): void => {
  const pattern = new RegExp(
    `(?=(${Object.keys(NUM_STRING).join("|")}|[0-9]))`,
    "g"
  );

  const sum2 = input.reduce((acc, curr) => {
    const matches = [...curr.matchAll(pattern)];
    const [, first = ""] = matches.at(0) ?? [];
    const [, last = ""] = matches.at(-1) ?? [];

    const comb = [getNumber(first), getNumber(last)].join("");
    return acc + parseInt(comb, 10);
  }, 0);

  Logger.success(`Part 2: ${sum2}`);
};

const getNumber = (value: string): string =>
  NUM_STRING[value]?.toString() ?? value;
