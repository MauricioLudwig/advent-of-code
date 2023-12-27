import { Input, Logger } from "../@@utils";

export default async () => {
  const grid = new Input("./2021/files/25.txt").asArray.map((o) => o.split(""));

  let iteration = 0;
  let hasChanged = false;
  const maxY = grid.length - 1;
  const maxX = grid[0]!.length - 1;

  while (true) {
    hasChanged = false;
    iteration++;

    [">", "v"].forEach((o) => {
      const previousGrid = JSON.parse(JSON.stringify(grid)) as string[][];

      for (let y = 0; y < previousGrid.length; y++) {
        for (let x = 0; x < previousGrid[y]!.length; x++) {
          const it = previousGrid[y]?.[x]!;

          if (it !== o) {
            continue;
          }

          let nextY = o === "v" ? (y === maxY ? 0 : y + 1) : y;
          let nextX = o === ">" ? (x === maxX ? 0 : x + 1) : x;

          if (previousGrid[nextY]?.[nextX] === ".") {
            grid[nextY]![nextX] = o;
            grid[y]![x] = ".";
            hasChanged = true;
          }
        }
      }
    });

    if (!hasChanged) {
      break;
    }
  }

  Logger.success(`Part 1: ${iteration}`);
};
