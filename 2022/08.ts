import { Input, Logger } from "../@@utils";

export default async () => {
  const grid = new Input("./2022/files/08.txt").asArray.map((o) =>
    o.split("").map(Number)
  );

  let visibleTrees = 0;
  let maxScenicScore = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0, xLen = grid[y]?.length ?? 0; x < xLen; x++) {
      const el = grid?.[y]?.[x] ?? Infinity;

      const row = grid[y] ?? [];
      const col = getColumn(grid, x);

      const directions: [number[], number, number][] = [
        [row, 0, x],
        [row, x + 1, row.length],
        [col, 0, y],
        [col, y + 1, col.length],
      ];

      const treeLines = directions.map(([file, start, end]) =>
        getTreeLine(file, start, end)
      );

      if (treeLines.some((o) => o.every((x) => x < el))) {
        visibleTrees++;
      }

      const [l = [], r = [], t = [], b = []] = treeLines;

      const treeScenicScore = [[...l.reverse()], r, [...t.reverse()], b].reduce(
        (acc, curr) => acc * getScenicFileScore([...curr], el),
        1
      );

      if (treeScenicScore > maxScenicScore) {
        maxScenicScore = treeScenicScore;
      }
    }
  }

  Logger.success(`Part 1: ${visibleTrees}`);
  Logger.success(`Part 2: ${maxScenicScore}`);
};

const getTreeLine = (file: number[], start: number, end: number): number[] =>
  file.slice(start, end);

const getColumn = (grid: number[][], i: number): number[] => {
  const column: number[] = [];

  for (let y = 0; y < grid.length; y++) {
    column.push(grid?.[y]?.[i] ?? Infinity);
  }

  return column;
};

const getScenicFileScore = (row: number[], tree: number): number => {
  let score = 0;

  while (row.length > 0) {
    const nextTree = row.shift() ?? Infinity;
    score++;

    if (nextTree >= tree) {
      break;
    }
  }

  return score;
};
