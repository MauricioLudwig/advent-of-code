import { getAsSingleLine } from '../input';
import { success } from '../utils/logger';

type THouses = Record<string, number>;

export default async () => {
  const directions = getAsSingleLine('03.txt').split('');

  (() => {
    const grid = new Grid();
    const houses: THouses = {
      '0,0': 1,
    };

    directions.forEach((o) => {
      grid.move(o);
      houses[grid.key] = (houses[grid.key] ?? 0) + 1;
    });

    success(`Part 1: ${getRepeatVisits(houses)}`);
  })();

  (() => {
    const grid1 = new Grid();
    const grid2 = new Grid();
    const houses: THouses = {
      '0,0': 1,
    };

    directions.forEach((o, i) => {
      if (i % 2 === 0) {
        grid1.move(o);
        houses[grid1.key] = (houses[grid1.key] ?? 0) + 1;
      } else {
        grid2.move(o);
        houses[grid2.key] = (houses[grid2.key] ?? 0) + 1;
      }
    });

    success(`Part 2: ${getRepeatVisits(houses)}`);
  })();
};

const getRepeatVisits = (houses: THouses) =>
  Object.values(houses).filter((o) => o > 0).length;

class Grid {
  x = 0;
  y = 0;

  move(direction: string): void {
    switch (direction) {
      case '<':
        this.x += -1;
        break;
      case '^':
        this.y += 1;
        break;
      case '>':
        this.x += 1;
        break;
      case 'v':
        this.y += -1;
        break;
      default:
        this.fail(`${direction} did not match any case.`);
    }
  }

  get key(): string {
    return `${this.x},${this.y}`;
  }

  private fail(msg: string): never {
    throw new Error(msg);
  }
}
