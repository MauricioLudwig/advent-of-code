import { Input, Logger } from "../@@utils";

export default async () => {
  const input = new Input("./2023/files/09.txt").asArray.map((o) =>
    o.split(" ").map(Number)
  );

  const sum1 = input.reduce((acc, curr) => {
    const history = getHistory(curr);
    appendToHistoryLast(history);
    return acc + history?.[0]?.at(-1)!;
  }, 0);

  const sum2 = input.reduce((acc, curr) => {
    const history = getHistory(curr);
    appendToHistoryFirst(history);
    return acc + history?.[0]?.at(0)!;
  }, 0);

  Logger.success(`Part 1: ${sum1}`);
  Logger.success(`Part 2: ${sum2}`);
};

export const getHistory = (ns: number[]): number[][] => {
  const history: number[][] = [];
  history.push([...ns]);

  while (true) {
    const lastRow = history.at(-1)!;

    if (lastRow.every((o) => o === 0)) {
      break;
    }

    const nextRow: number[] = [];

    for (let i = 0; i < lastRow.length - 1; i++) {
      const it = lastRow[i + 1]! - lastRow[i]!;
      nextRow.push(it);
    }

    history.push([...nextRow]);
  }

  return history;
};

export const appendToHistoryFirst = (history: number[][]): void => {
  history.at(-1)?.unshift(0);

  for (let i = history.length - 1; i >= 1; i--) {
    const nextRow = history[i - 1]!;
    const newVal = nextRow?.[0]! - history?.[i]?.[0]!;
    nextRow.unshift(newVal);
  }
};

export const appendToHistoryLast = (history: number[][]): void => {
  history.at(-1)?.push(0);

  for (let i = history.length - 1; i >= 1; i--) {
    const lastIndex = history[i]!.length - 1;
    const nextRow = history[i - 1]!;
    const newVal = nextRow?.[lastIndex]! + history?.[i]?.[lastIndex]!;
    nextRow.push(newVal);
  }
};
