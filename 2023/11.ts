import { Input, Logger } from "../@@utils";
import { calcManhattanDistance } from "../@@utils/calc";

export default async () => {
  const grid = new Input("./2023/files/11.txt").asArray.map((o) => o.split(""));

  expandColumns(grid);
  expandRows(grid);

  const coordinates = getCoordinates(grid);

  const sum1 = coordinates.reduce((acc, curr, i, arr) => {
    const rest = arr
      .slice(i + 1)
      .reduce(
        (accInner, currInner) =>
          accInner + calcManhattanDistance(curr, currInner),
        0
      );
    return acc + rest;
  }, 0);

  Logger.success(`Part 1: ${sum1}`);
};

export const getCoordinates = (grid: string[][]): [number, number][] => {
  const coordinates: [number, number][] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let y = 0; y < grid[0]!.length; y++) {
      if (grid?.[i]?.[y] === "#") {
        coordinates.push([i, y]);
      }
    }
  }

  return coordinates;
};

export const expandColumns = (grid: string[][]): void => {
  let i = 0;

  while (true) {
    const colLen = grid[0]?.length! - 1;

    if (i >= colLen) {
      break;
    }

    const hasBlankCol = grid.every((row) => row[i] === ".");

    if (hasBlankCol) {
      grid.forEach((row) => {
        row.splice(i, 0, ".");
      });
      i += 2;
    } else {
      i++;
    }
  }
};

export const expandRows = (grid: string[][]): void => {
  const blankRows = [...Array(grid[0]!.length)].map((_) => ".");
  let i = 0;

  while (true) {
    const row = grid[i];

    if (!row) {
      break;
    }

    if (row.join("") === blankRows.join("")) {
      grid.splice(i, 0, [...blankRows]);
      i += 2;
    } else {
      i++;
    }
  }
};
