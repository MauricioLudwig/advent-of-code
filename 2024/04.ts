import { Input, Logger } from "../@@utils";

const directions: [number, number][] = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

const diag1: [number, number][] = [
  [-1, -1],
  [1, 1],
];

const diag2: [number, number][] = [
  [1, -1],
  [-1, 1],
];

const XMAS = "XMAS".split("");
const MS = "MS".split("");

export default async () => {
  const grid = new Input("./2024/files/04.txt").asArray.map((o) => o.split(""));

  let occurrences1 = 0;
  let occurrences2 = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0]!.length; x++) {
      occurrences1 += directions.reduce((acc, [xInc, yInc]) => {
        const validXmas = checkPattern(x, xInc, y, yInc, grid) ? 1 : 0;
        return acc + (validXmas ? 1 : 0);
      }, 0);

      const validMas =
        grid[y]?.[x] === "A" &&
        [diag1, diag2].every((diag) => {
          const coords = diag.map(([xInc, yInc]) => grid[y + yInc]?.[x + xInc]);
          return MS.every((o) => coords.includes(o));
        });

      occurrences2 += validMas ? 1 : 0;
    }
  }

  Logger.success(`Part 1: ${occurrences1}`);
  Logger.success(`Part 2: ${occurrences2}`);
};

const checkPattern = (
  x0: number,
  xInc: number,
  y0: number,
  yInc: number,
  grid: string[][],
  pattern = XMAS
): boolean =>
  pattern.every((o, i) => grid[yInc * i + y0]?.[xInc * i + x0] === o);
