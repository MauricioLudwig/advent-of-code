import { Input, Logger } from "../@@utils";

export default async () => {
  const [r = [], u = []] = new Input("./2024/files/05.txt").AsMatrix("");

  const rules = r.reduce((acc, curr) => {
    const [n1, n2] = curr.split("|").map(Number);
    return {
      ...acc,
      [n1!]: [...(acc[n1!] ?? []), n2!],
    };
  }, {} as Record<number, number[]>);

  const updates = u.map((o) => o.split(",").map(Number));

  const correctUpdates = updates.filter((update) =>
    verifyUpdate(update, rules)
  );

  Logger.success(`Part 1: ${getMiddlePageNumSum(correctUpdates)}`);

  const incorrectUpdates = updates.filter(
    (update) => !verifyUpdate(update, rules)
  );

  const correctedUpdates = incorrectUpdates.map((incUpdate) => {
    let arr = [...incUpdate];

    while (!verifyUpdate(arr, rules)) {
      for (let i = 0; i < arr.length; i++) {
        const n = arr[i]!;
        const rest = arr.slice(i + 1);
        const valid = rest.every((o) => rules[n]?.includes(o));

        if (!valid) {
          arr.splice(i, 1);
          arr.push(n);
          break;
        }
      }
    }

    return [...arr];
  });

  Logger.success(`Part 2: ${getMiddlePageNumSum(correctedUpdates)}`);
};

const verifyUpdate = (
  update: number[],
  rules: Record<number, number[]>
): boolean =>
  update.every((n, i, arr) =>
    arr.slice(i + 1).every((r) => rules[n]?.includes(r))
  );

const getMiddlePageNumSum = (updates: number[][]) =>
  updates.reduce(
    (acc, curr) => acc + (curr[Math.round((curr.length - 1) / 2)] ?? 0),
    0
  );
