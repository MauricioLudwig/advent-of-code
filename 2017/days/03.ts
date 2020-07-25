import { success, end } from '../utils/logger';

interface Grid {
  [key: string]: number;
}

interface Position {
  x: number;
  y: number;
}

enum Direction {
  Right,
  Up,
  Left,
  Down,
}

const ccRotation = [
  Direction.Right,
  Direction.Up,
  Direction.Left,
  Direction.Down,
];

export default (): void => {
  const input = 347991;

  const grid: Grid = {};
  grid['0,0'] = 1;

  let position = { x: 0, y: 0 };
  let rotationIndex = 0;
  let firstInstance = true;

  for (let i = 2; i <= input; i++) {
    let newPosition: Position = { ...position };

    switch (ccRotation[rotationIndex]) {
      case Direction.Right:
        newPosition.x = position.x + 1;
        break;
      case Direction.Up:
        newPosition.y = position.y + 1;
        break;
      case Direction.Left:
        newPosition.x = position.x - 1;
        break;
      case Direction.Down:
        newPosition.y = position.y - 1;
        break;
    }

    if (grid[getKey(newPosition.y, newPosition.x)] ?? false) {
      i--;
      rotationIndex--;
    } else {
      grid[getKey(newPosition.y, newPosition.x)] = calcAdjacentTilesSum(
        grid,
        newPosition.x,
        newPosition.y
      );
      position = { ...newPosition };
      rotationIndex++;
    }

    if (rotationIndex < 0) {
      rotationIndex = ccRotation.length - 1;
    }

    if (rotationIndex === ccRotation.length) {
      rotationIndex = 0;
    }

    const adjacentTilesSum = grid[getKey(position.y, position.x)] ?? 0;
    if (adjacentTilesSum > input && firstInstance) {
      firstInstance = false;
      success(`Part 2: ${adjacentTilesSum}`);
    }

    if (i === input) {
      success(`Part 1: ${calcManhattanDistance(position)}`);
    }
  }

  end();
};

const calcManhattanDistance = ({ x, y }: Position): number =>
  Math.abs(y) + Math.abs(x);

const calcAdjacentTilesSum = (grid: Grid, x: number, y: number): number => {
  return (
    (grid[getKey(y + 1, x - 1)] ?? 0) +
    (grid[getKey(y + 1, x)] ?? 0) +
    (grid[getKey(y + 1, x + 1)] ?? 0) +
    (grid[getKey(y, x - 1)] ?? 0) +
    (grid[getKey(y, x + 1)] ?? 0) +
    (grid[getKey(y - 1, x - 1)] ?? 0) +
    (grid[getKey(y - 1, x)] ?? 0) +
    (grid[getKey(y - 1, x + 1)] ?? 0)
  );
};

const getKey = (y: number, x: number): string => `${y},${x}`;
