import { TDayFn } from "../@@types";
import { Input, Logger } from "../@@utils";

const pattern = /move (\d+) from (\d+) to (\d+)/;

export default async (): TDayFn => {
  const input = new Input("./2022/files/05.txt").asArray
    .filter((o) => pattern.test(o))
    .map((o) => {
      const [, count = "", from = "", to = ""] = o.match(pattern) ?? [];
      return {
        count: parseInt(count, 10),
        from: parseInt(from, 10),
        to: parseInt(to, 10),
      };
    });

  const crates: Array<Array<string>> = [
    "wrf",
    "thmcdvwp",
    "pmznl",
    "jchr",
    "cpghqtb",
    "gcwlfz",
    "wvlqzjgc",
    "pnrfwtvc",
    "jwhgrsv",
  ].map((o) => o.split("").map((x) => x.toUpperCase()));

  // Change for Part 2
  const isPart1 = true;

  input.forEach(({ count, from, to }) => {
    const removedStacks = crates[from - 1]?.splice(count * -1) ?? [];
    if (isPart1) {
      removedStacks.reverse();
    }
    crates[to - 1]?.push(...removedStacks);
  });

  const arrangement = crates.map((o) => o[o.length - 1]).join("");
  Logger.success(`Part ${isPart1 ? "1" : "2"}: ${arrangement}`);
};
