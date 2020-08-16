import chalk from 'chalk';
import logUpdate from 'log-update';
import { getAsArray } from '../input';
import { success, end } from '../utils/logger';
import { sleep } from '../utils/helper-functions';

interface ITurn {
  [key: string]: string;
}

const CART_DIRECTION = {
  UP: '^',
  DOWN: 'v',
  LEFT: '<',
  RIGHT: '>',
};

const LEFT_TURN: ITurn = {
  '^': '<',
  '<': 'v',
  v: '>',
  '>': '^',
};

const RIGHT_TURN: ITurn = {
  '^': '>',
  '>': 'v',
  v: '<',
  '<': '^',
};

const INTERSECTION_SLASH_TURN: ITurn = {
  '>': '^',
  v: '<',
  '^': '>',
  '<': 'v',
};

const INTERSECTION_BACK_SLASH: ITurn = {
  '^': '<',
  '>': 'v',
  '<': '^',
  v: '>',
};

interface ICart {
  x: number;
  y: number;
  direction: string;
  nextIntersection: number;
  key: string;
}

export default async (): Promise<void> => {
  const input = getAsArray('13.txt');

  // toggle flag to print cart movement
  const PRINT_GRID = false;

  const grid = input.map((o) => o.split(''));
  let carts: ICart[] = [];

  for (let y = 0, lenY = grid.length; y < lenY; y++) {
    for (let x = 0, lenX = grid[y].length; x < lenX; x++) {
      const gridItem = grid[y][x];
      if (Object.values(CART_DIRECTION).some((c) => gridItem === c)) {
        carts.push({
          x,
          y,
          direction: gridItem,
          nextIntersection: 1,
          key: `${x},${y}`,
        });
        grid[y][x] = [CART_DIRECTION.LEFT, CART_DIRECTION.RIGHT].some(
          (o) => gridItem === o
        )
          ? '-'
          : '|';
      }
    }
  }

  let tick = 0;
  let firstCrash = null;

  while (true) {
    if (PRINT_GRID) {
      await printGrid(grid, carts, tick, 25);
    }
    let crashes: ICart[] = [];

    carts.forEach((cart) => {
      let nextPosition = undefined;

      switch (cart.direction) {
        case CART_DIRECTION.UP:
          nextPosition = grid[cart.y - 1][cart.x];
          cart.y = cart.y - 1;
          break;
        case CART_DIRECTION.DOWN:
          nextPosition = grid[cart.y + 1][cart.x];
          cart.y = cart.y + 1;
          break;
        case CART_DIRECTION.LEFT:
          nextPosition = grid[cart.y][cart.x - 1];
          cart.x = cart.x - 1;
          break;
        case CART_DIRECTION.RIGHT:
          nextPosition = grid[cart.y][cart.x + 1];
          cart.x = cart.x + 1;
          break;
        default:
          throw new Error(`No case matched (${cart.direction})`);
      }

      if (nextPosition === '+') {
        switch (cart.nextIntersection) {
          case 1:
            cart.direction = LEFT_TURN[cart.direction];
            break;
          case 2:
            cart.direction = cart.direction;
            break;
          case 3:
            cart.direction = RIGHT_TURN[cart.direction];
            break;
          default:
            throw new Error(`No case matched (${cart.nextIntersection})`);
        }

        cart.nextIntersection = cart.nextIntersection + 1;

        if (cart.nextIntersection > 3) {
          cart.nextIntersection = 1;
        }
      } else if (nextPosition === '/') {
        cart.direction = INTERSECTION_SLASH_TURN[cart.direction];
      } else if (nextPosition === '\\') {
        cart.direction = INTERSECTION_BACK_SLASH[cart.direction];
      }

      crashes = crashes.concat(findCrashes(carts));
    });

    if (!firstCrash && crashes.length > 0) {
      const [crash] = crashes;
      firstCrash = { x: crash.x, y: crash.y };
    }

    carts = carts.filter((o) => !crashes.some((c) => o.key === c.key));
    sortCarts(carts);
    tick++;

    if (carts.length === 1) {
      break;
    }
  }

  success(`Part 1: ${firstCrash?.x},${firstCrash?.y}`);

  const [cart] = carts;
  success(`Part 2: ${cart.x},${cart.y}`);

  end();
};

const findCrashes = (carts: ICart[]): ICart[] =>
  carts.filter((o, indexO) =>
    carts.some((c, indexX) => o.x === c.x && o.y === c.y && indexO !== indexX)
  );

const sortCarts = (carts: ICart[]) => {
  carts.sort((a, b) => {
    if (a.y > b.y) {
      return 1;
    }

    if (b.y > a.y) {
      return -1;
    }

    if (a.x > b.x) {
      return 1;
    }

    if (b.x > a.x) {
      return -1;
    }

    return 0;
  });
};

type PrintGrid = (
  grid: string[][],
  carts: ICart[],
  tick: number,
  speed: number
) => Promise<void>;

const printGrid: PrintGrid = async (grid, carts, tick, speed) => {
  let str = '';

  for (let y = 0, lenY = grid.length; y < lenY; y++) {
    for (let x = 0, lenX = grid[y].length; x < lenX; x++) {
      const cart = carts.filter((c) => c.y === y && c.x === x);
      if (cart.length > 1) {
        str += chalk.redBright('X');
      } else if (cart.length === 1) {
        str += chalk.yellowBright(cart[0].direction);
      } else {
        str += grid[y][x];
      }
    }
    str += '\n';
  }

  str += `\nTick: ${tick}\n`;

  logUpdate(str);
  await sleep(speed);
};
