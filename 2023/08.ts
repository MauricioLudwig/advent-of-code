import { Input, Logger } from "../@@utils";
import { getPrimeFactorization } from "../@@utils/calc";

type Network = Record<string, Record<string, string>>;

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
  }, {} as Network);

  const steps1 = getSteps(instructions, network);
  Logger.success(`Part 1: ${steps1}`);

  const primeFactorizationLs = Object.keys(network)
    .filter((k) => k.endsWith("A"))
    .map((o) => getSteps(instructions, network, o))
    .flatMap(getPrimeFactorization);

  const steps2 = Array.from(new Set(primeFactorizationLs)).reduce(
    (acc, curr) => acc * curr,
    1
  );

  Logger.success(`Part 2: ${steps2}`);
};

const getSteps = (
  instructions: string[],
  network: Network,
  startNode = "AAA"
): number => {
  let steps = 0;
  let loop = true;
  let nextNode = startNode;

  while (loop) {
    for (let it of instructions) {
      steps++;
      const node = network?.[nextNode]?.[it];

      if (!node) {
        throw new Error("Node not found");
      }

      nextNode = node;

      if (nextNode.endsWith("Z")) {
        loop = false;
        break;
      }
    }
  }

  return steps;
};
