import { Input, Logger } from "../@@utils";

export default async () => {
  const input = new Input("./2022/files/02.txt").asArray;

  const playerMap = new Map<string, number>([
    ["AY", 8],
    ["AX", 4],
    ["AZ", 3],
    ["BY", 5],
    ["BX", 1],
    ["BZ", 9],
    ["CY", 2],
    ["CX", 7],
    ["CZ", 6],
  ]);

  const outcomeMap = new Map<string, number>([
    ["AY", 4],
    ["AZ", 8],
    ["AX", 3],
    ["BY", 5],
    ["BZ", 9],
    ["BX", 1],
    ["CY", 6],
    ["CZ", 7],
    ["CX", 2],
  ]);

  Logger.success(`Part 1: ${calcScore(input, playerMap)}`);
  Logger.success(`Part 2: ${calcScore(input, outcomeMap)}`);
};

const calcScore = (input: Array<string>, map: Map<string, number>): number =>
  input.reduce((acc, curr) => acc + (map.get(curr.replace(" ", "")) ?? 0), 0);
