import chalk from 'chalk';
import log from 'log-update';
import { getAsArray } from '../input';
import { success, end } from '../utils/logger';
import { sleep } from '../utils/helper-functions';

enum Node {
  VERTICAL = '|',
  HORIZONTAL = '-',
  TURN = '+',
  EMPTY = ' ',
}

enum Direction {
  UP = 1,
  RIGHT,
  DOWN,
  LEFT,
}

interface IPosition {
  x: number;
  y: number;
}

export default async (): Promise<void> => {
  const network = getAsArray('19.txt').map((o): string[] => o.split(''));
  const sequence: string[] = [];
  const position = getStartingPoint(network);
  let direction = Direction.DOWN;
  let step = 0;
  let loop = true;
  const PRINT = false; // set to true to print network and pathing to the console

  while (loop) {
    step++;
    switch (direction) {
      case Direction.UP:
        position.y += -1;
        break;
      case Direction.RIGHT:
        position.x += 1;
        break;
      case Direction.DOWN:
        position.y += 1;
        break;
      case Direction.LEFT:
        position.x += -1;
        break;
      default:
        throw new Error(`No case matched: ${direction}`);
    }

    const node = network[position.y][position.x];

    switch (node) {
      case Node.VERTICAL:
      case Node.HORIZONTAL:
        break;
      case Node.TURN:
        direction = turn(network, direction, position);
        break;
      case Node.EMPTY:
        loop = false;
        break;
      default:
        sequence.push(node);
    }

    if (PRINT) {
      await print(network, position, step, sequence);
    }
  }

  success(`Part 1: ${sequence.join('')}`);
  success(`Part 2: ${step}`);
  end();
};

const getStartingPoint = (network: string[][]): IPosition => {
  for (let y = 0; y < network.length; y++) {
    for (let x = 0; x < network[y].length; x++) {
      if (
        Object.values(Node).some((n) => n !== Node.EMPTY && n === network[y][x])
      ) {
        return { x, y };
      }
    }
  }

  throw new Error('Unable to find a starting point.');
};

type Turn = (
  network: string[][],
  direction: Direction,
  position: IPosition
) => Direction;

const turn: Turn = (network, direction, position) => {
  const { x, y } = position;

  const up = network[y - 1] ? network[y - 1][x] : Node.EMPTY;
  const right = network[y][x + 1] ?? Node.EMPTY;
  const down = network[y + 1] ? network[y + 1][x] : Node.EMPTY;
  const left = network[y][x - 1] ?? Node.EMPTY;

  if ([Direction.UP, Direction.DOWN].includes(direction)) {
    if (/[A-Z-]/.test(left)) {
      return Direction.LEFT;
    }

    if (/[A-Z-]/.test(right)) {
      return Direction.RIGHT;
    }
  }

  if ([Direction.LEFT, Direction.RIGHT].includes(direction)) {
    if (/[A-Z|]/.test(up)) {
      return Direction.UP;
    }

    if (/[A-Z|]/.test(down)) {
      return Direction.DOWN;
    }
  }

  throw new Error('No matching turn found.');
};

type Print = (
  network: string[][],
  position: IPosition,
  step: number,
  sequence: string[]
) => Promise<void>;

const print: Print = async (network, position, step, sequence) => {
  log.clear();
  let str = '';
  str += chalk.yellow(`\nStep: ${step}\n`);
  str += chalk.yellow(`Sequence: ${sequence.join('')}\n\n`);
  let size = 10;

  for (let y = position.y - size, yMax = position.y + size; y < yMax; y++) {
    for (let x = position.x - size, xMax = position.x + size; x < xMax; x++) {
      if (!(network[y] && network[y][x])) {
        str += ' ';
      } else if (y === position.y && x === position.x) {
        str += chalk.magentaBright(network[y][x]);
      } else {
        str += network[y][x];
      }
    }
    str += '\n';
  }

  log(str);
  await sleep(10);
};
