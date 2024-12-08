import { Input, Logger } from "../@@utils";

type Coord = [number, number];

export default async () => {
  const grid = new Input("./2024/files/08.txt").asArray.map((o) => o.split(""));

  const antennas = Array.from(new Set(grid.flat()))
    .filter((o) => o !== ".")
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: [],
      }),
      {} as Record<string, Coord[]>
    );

  grid.forEach((row, y) => {
    row.forEach((it, x) => {
      if (it !== ".") {
        antennas[it]?.push([x, y]);
      }
    });
  });

  const antiNodes1: Coord[] = [];
  const antiNodes2: Coord[] = [];

  Object.entries(antennas).forEach(([_, v]) => {
    for (let i = 0; i < v.length; i++) {
      const [x0, y0] = v[i]!;
      const rest = v.slice(i + 1);

      rest.forEach(([x1, y1]) => {
        const deltaX = x1 - x0;
        const deltaY = y1 - y0;

        const nextNodes: [number, number][] = [
          [x0 - deltaX, y0 - deltaY],
          [x1 + deltaX, y1 + deltaY],
        ];

        nextNodes.forEach(([nextX, nextY]) => {
          addAntiNode(nextX, nextY, grid, antiNodes1);
          addNodeAscRecursively(
            nextX,
            nextY,
            [deltaX, deltaY],
            grid,
            antiNodes2
          );
          addNodeDescRecursively(
            nextX,
            nextY,
            [deltaX, deltaY],
            grid,
            antiNodes2
          );
        });
      });
    }
  });

  Logger.success(`Part 1: ${antiNodes1.length}`);
  Logger.success(`Part 2: ${antiNodes2.length}`);
};

const addAntiNode = (
  x: number,
  y: number,
  grid: string[][],
  antiNodes: Coord[]
): void => {
  const withinBounds = grid[y]?.[x];

  if (withinBounds && !antiNodes.some(([x0, y0]) => x === x0 && y === y0)) {
    antiNodes.push([x, y]);
  }
};

const addNodeAscRecursively = (
  x: number,
  y: number,
  delta: Coord,
  grid: string[][],
  antiNodes: Coord[]
) => {
  addAntiNode(x, y, grid, antiNodes);

  const nextX = x + delta[0];
  const nextY = y + delta[1];

  if (grid[nextY]?.[nextX]) {
    addNodeAscRecursively(nextX, nextY, delta, grid, antiNodes);
  }
};

const addNodeDescRecursively = (
  x: number,
  y: number,
  delta: Coord,
  grid: string[][],
  antiNodes: Coord[]
): void => {
  addAntiNode(x, y, grid, antiNodes);

  const nextX = x - delta[0];
  const nextY = y - delta[1];

  if (grid[nextY]?.[nextX]) {
    addNodeDescRecursively(nextX, nextY, delta, grid, antiNodes);
  }
};
