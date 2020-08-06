import { getAsArray } from '../input';
import { IGrid, drawGrid } from '../utils/helper-functions';
import { success, end } from '../utils/logger';

enum Node {
  CLEAN = '.',
  INFECTED = '#',
  WEAKENED = 'W',
  FLAGGED = 'F',
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

class Grid {
  direction = Direction.UP;
  infections = 0;

  constructor(public grid: IGrid, public x: number, public y: number) {}

  get position(): number[] {
    return [this.x, this.y];
  }

  get node(): string {
    if (!Object.prototype.hasOwnProperty.call(this.grid, this.y)) {
      this.grid[this.y] = {};
    }

    return this.grid[this.y][this.x];
  }

  setNode(n: Node): void {
    this.grid[this.y][this.x] = n;
  }

  changeDirection(): void {
    let index = 0;

    switch (this.node) {
      case Node.WEAKENED:
        break;
      case Node.INFECTED:
        index = rightRotation.indexOf(this.direction);
        this.direction = rightRotation[(index + 1) % rightRotation.length];
        break;
      case Node.FLAGGED:
        index = leftRotation.indexOf(this.direction);
        this.direction = leftRotation[(index + 2) % leftRotation.length];
        break;
      case Node.CLEAN:
      default:
        index = leftRotation.indexOf(this.direction);
        this.direction = leftRotation[(index + 1) % leftRotation.length];
        break;
    }
  }

  advance(): void {
    switch (this.direction) {
      case Direction.UP:
        this.y += -1;
        break;
      case Direction.RIGHT:
        this.x += 1;
        break;
      case Direction.DOWN:
        this.y += 1;
        break;
      case Direction.LEFT:
        this.x += -1;
        break;
      default:
        throw new Error(`No case matched: ${this.direction}`);
    }
  }

  print(): void {
    drawGrid(this.grid, '.', {
      x: this.x,
      y: this.y,
    });
  }
}

export default () => {
  const input = getAsArray('22.txt').map((o): string[] => o.split(''));
  const origin = Math.round(input.length / 2) - 1;

  const grid: IGrid = input.reduce((colAcc, colcurr, colIndex) => {
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

  const grid1 = new Grid(
    JSON.parse(JSON.stringify(grid)) as IGrid,
    origin,
    origin
  );
  const grid2 = new Grid(
    JSON.parse(JSON.stringify(grid)) as IGrid,
    origin,
    origin
  );

  for (let i = 0; i < 10000; i++) {
    grid1.changeDirection();

    if (grid1.node === Node.INFECTED) {
      grid1.setNode(Node.CLEAN);
    } else {
      grid1.setNode(Node.INFECTED);
      grid1.infections++;
    }

    grid1.advance();
  }

  success(`Part 1: ${grid1.infections}`);

  for (let i = 0; i < 10e6; i++) {
    grid2.changeDirection();

    switch (grid2.node) {
      case Node.WEAKENED:
        grid2.setNode(Node.INFECTED);
        grid2.infections++;
        break;
      case Node.INFECTED:
        grid2.setNode(Node.FLAGGED);
        break;
      case Node.FLAGGED:
        grid2.setNode(Node.CLEAN);
        break;
      case Node.CLEAN:
      default:
        grid2.setNode(Node.WEAKENED);
        break;
    }

    grid2.advance();
  }

  success(`Part 2: ${grid2.infections}`);

  end();
};
