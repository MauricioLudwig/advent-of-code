import { Input, Logger } from "../@@utils";

export default async () => {
  const input = new Input("./2024/files/07.txt").asArray.map((o) => {
    const [r = "", ns = ""] = o.split(":");
    const args = ns.trim().split(" ").map(Number);
    return {
      res: +r,
      args,
    };
  });

  let isPart1 = false;

  const sum = input.reduce((acc, { res, args }) => {
    const permutationSums = getRecursiveEquationSum(0, args, res, isPart1);
    return acc + (permutationSums.includes(res) ? res : 0);
  }, 0);

  Logger.success(`Part ${isPart1 ? "1" : "2"}: ${sum}`);
};

const getRecursiveEquationSum = (
  currentSum: number,
  nums: number[],
  res: number,
  isPart1: boolean
): number[] => {
  if (nums.length === 0) {
    return [currentSum];
  }

  if (currentSum > res) {
    return [];
  }

  const arr = [...nums];
  const next = arr.shift() ?? 0;

  const operands: number[] = [next * currentSum, next + currentSum];

  if (!isPart1) {
    operands.push(+[currentSum, next].join(""));
  }

  return operands
    .map((o) => getRecursiveEquationSum(o, arr, res, isPart1))
    .flat();
};
