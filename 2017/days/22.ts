import { getAsArray } from '../input';
import { Grid } from '../utils/helper-functions';
import { success, end } from '../utils/logger';

enum Node {
  CLEAN = '.',
  INFECTED = '#',
}

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

const leftRotation = [
  Direction.UP,
  Direction.LEFT,
  Direction.DOWN,
  Direction.RIGHT,
];

const rightRotation = [
  Direction.UP,
  Direction.RIGHT,
  Direction.DOWN,
  Direction.LEFT,
];

export default () => {
  const input = getAsArray('22.txt').map((o): string[] => o.split(''));

  const grid: Grid = input.reduce((colAcc, colcurr, colIndex) => {
    const row = colcurr.reduce((rowAcc, rowCurr, rowIndex) => {
      return {
        ...rowAcc,
        [rowIndex]: rowCurr,
      };
    }, {});

    return {
      ...colAcc,
      [colIndex]: { ...row },
    };
  }, {});

  const burst = 10000;
  let direction = Direction.UP;
  const origin = Math.round(input.length / 2) - 1;
  let position = [origin, origin];
  let infections = 0;

  for (let i = 0; i < burst; i++) {
    const [x, y] = position;

    if (!Object.prototype.hasOwnProperty.call(grid, y)) {
      grid[y] = {};
    }

    if (grid[y][x] === Node.INFECTED) {
      const index = rightRotation.indexOf(direction);
      direction = rightRotation[(index + 1) % rightRotation.length];
      grid[y][x] = Node.CLEAN;
    } else {
      const index = leftRotation.indexOf(direction);
      direction = leftRotation[(index + 1) % leftRotation.length];
      grid[y][x] = Node.INFECTED;
      infections++;
    }

    switch (direction) {
      case Direction.UP:
        position[1] += -1;
        break;
      case Direction.RIGHT:
        position[0] += 1;
        break;
      case Direction.DOWN:
        position[1] += 1;
        break;
      case Direction.LEFT:
        position[0] += -1;
        break;
      default:
        throw new Error(`No case matched: ${direction}`);
    }
  }

  success(`Part 1: ${infections}`);
  end();
};
