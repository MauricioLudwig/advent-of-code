import { Input, Logger } from "../@@utils";
import { getAdjacentTiles } from "../@@utils/grid";

type Indices = [number, number][];

type GridNumber = {
  indices: Indices;
  value: number;
};

export default async () => {
  const grid = new Input("./2023/files/03.txt").asArray.map((o) => o.split(""));

  let sum1 = 0;
  let valid = false;
  let num = "";

  const gearIndices: Indices = [];
  let numberIndices: Indices = [];
  const gridNumbers: Array<GridNumber> = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y]!.length; x++) {
      const it = grid[y]?.[x] ?? "";

      if (it === "*") {
        gearIndices.push([x, y]);
      }

      if (/\d+/.test(it)) {
        num += it;
        numberIndices.push([x, y]);
      } else {
        if (valid) {
          sum1 += parseInt(num, 10);
          gridNumbers.push({
            indices: numberIndices,
            value: parseInt(num, 10),
          });
        }
        valid = false;
        num = "";
        numberIndices = [];
        continue;
      }

      const adjacentTiles = getAdjacentTiles(grid, x, y);
      const hasSymbolAdjacentTile = adjacentTiles.some(
        ([o = ""]) => !/[0-9\.]/.test(o)
      );

      if (!valid && hasSymbolAdjacentTile) {
        valid = true;
      }
    }
  }

  Logger.success(`Part 1: ${sum1}`);

  const validGears = gearIndices.map(([x, y]) => {
    const adjacentTiles = getAdjacentTiles(grid, x, y);
    const validGears = adjacentTiles
      .filter(([o = ""]) => /\d+/.test(o))
      .map(
        ([, x1, y1]) =>
          gridNumbers.find((o) =>
            o.indices.some(([x2, y2]) => x1 === x2 && y1 === y2)
          )?.value!
      );

    return Array.from(new Set(validGears));
  });

  const sum2 = validGears.reduce((acc, curr) => {
    if (curr.length > 1) {
      const gearSum = curr.reduce((acc2, curr2) => acc2 * curr2, 1);
      return acc + gearSum;
    }

    return acc;
  }, 0);

  Logger.success(`Part 2: ${sum2}`);
};
