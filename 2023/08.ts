import { Input, Logger } from "../@@utils";

export default async () => {
  const [s1, s2] = new Input("./2023/files/08.txt").AsMatrix("") ?? [];
  const instructions = s1?.[0]?.split("")!;
  const network = s2!.reduce((acc, curr) => {
    const [, k, L, R] = curr.match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/i) ?? [];

    if (!k || !L || !R) {
      throw new Error("Invalid values");
    }

    return {
      ...acc,
      [k]: {
        L,
        R,
      },
    };
  }, {} as Record<string, Record<string, string>>);

  let steps = 0;
  let loop = true;
  let nextNode = "AAA";

  while (loop) {
    for (let it of instructions) {
      steps++;
      const node = network?.[nextNode]?.[it];

      if (!node) {
        throw new Error("Node not found");
      }

      nextNode = node;

      if (nextNode === "ZZZ") {
        loop = false;
        break;
      }
    }
  }

  Logger.success(`Part 1: ${steps}`);
};
