import { Input, Logger } from "../@@utils";

export default async () => {
  const input = new Input("./2024/files/03.txt").asSingleLine;

  const sum1 = [...input.matchAll(/mul\((\d+)\,(\d+)\)/gi)].reduce(
    (acc, curr) => {
      const [, n1 = "", n2 = ""] = curr;
      return acc + +n1 * +n2;
    },
    0
  );

  Logger.success(`Part 1: ${sum1}`);

  let skip = false;
  let sum2 = 0;

  [...input.matchAll(/(?:mul\(\d+\,\d+\)|don\'t|do)/gi)].forEach((o) => {
    const [s = ""] = o;

    if (s === "do") {
      skip = false;
    } else if (s === `don't`) {
      skip = true;
    } else {
      if (!skip) {
        const [, n1 = "", n2 = ""] = s.match(/mul\((\d+)\,(\d+)\)/) ?? [];
        sum2 += +n1 * +n2;
      }
    }
  });

  Logger.success(`Part 2: ${sum2}`);
};
