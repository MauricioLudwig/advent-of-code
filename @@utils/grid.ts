export function getAdjacentTiles<T>(
  grid: T[][],
  currentX: number,
  currentY: number
): [T | undefined, number, number][] {
  const adjacentTiles: [number, number][] = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];
  return adjacentTiles.map(([x, y]): [T | undefined, number, number] => [
    getTile(grid, x + currentX, y + currentY),
    x + currentX,
    y + currentY,
  ]);
}

export function getTile<T>(
  grid: T[][],
  nextX: number,
  nextY: number
): T | undefined {
  return grid[nextY]?.[nextX];
}
