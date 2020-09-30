import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

enum Direction {
  North,
  Right,
  South,
  Left,
}

const directions: ReadonlyArray<Direction> = [
  Direction.North,
  Direction.Right,
  Direction.South,
  Direction.Left,
];

interface IPath {
  steps: number;
  direction: Direction;
}

interface ICoordinate {
  x: number;
  y: number;
}

class EasterBunnyHQ {
  direction = Direction.North;
  origin: ICoordinate = {
    x: 0,
    y: 0,
  };
  coordinate: ICoordinate = {
    x: 0,
    y: 0,
  };

  constructor(public paths: IPath[]) {}

  part1(): number {
    this.paths.forEach(({ steps, direction }) => {
      this.setDirection(direction);

      switch (this.direction) {
        case Direction.North:
          this.coordinate.y += steps;
          break;
        case Direction.Right:
          this.coordinate.x += steps;
          break;
        case Direction.South:
          this.coordinate.y -= steps;
          break;
        case Direction.Left:
          this.coordinate.x -= steps;
          break;
      }
    });

    return this.calcManhattanDistance(this.coordinate, this.origin);
  }

  part2(): number {
    const pastCoordinates: ICoordinate[] = [];
    let cancel = false;

    for (let i = 0; i < this.paths.length; i++) {
      const { steps, direction } = this.paths[i];
      this.setDirection(direction);

      for (let y = 0; y < steps; y++) {
        switch (this.direction) {
          case Direction.North:
            this.coordinate.y++;
            break;
          case Direction.Right:
            this.coordinate.x++;
            break;
          case Direction.South:
            this.coordinate.y--;
            break;
          case Direction.Left:
            this.coordinate.x--;
            break;
        }

        const { x, y } = this.coordinate;

        if (pastCoordinates.some((o) => o.x === x && o.y === y)) {
          cancel = true;
          break;
        }

        pastCoordinates.push({ ...this.coordinate });
      }

      if (cancel) {
        break;
      }
    }

    return this.calcManhattanDistance(this.coordinate, this.origin);
  }

  private setDirection(direction: Direction): void {
    const index = this.direction + direction;
    this.direction = directions[index % directions.length];
  }

  private calcManhattanDistance(p1: ICoordinate, p2: ICoordinate): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }
}

export default (): void => {
  const paths: IPath[] = getAsSingleLine('01.txt')
    .split(', ')
    .map((o) => {
      const match = o.match(/([NRSL])(\d+)/);

      if (!match) {
        throw new Error('No match found.');
      }

      const [, d, steps] = match;
      let direction: Direction;

      switch (d) {
        case 'N':
          direction = Direction.North;
          break;
        case 'R':
          direction = Direction.Right;
          break;
        case 'S':
          direction = Direction.South;
          break;
        case 'L':
          direction = Direction.Left;
          break;
        default:
          throw new Error(`No case matched for ${d}`);
      }

      return {
        steps: parseInt(steps),
        direction,
      };
    });

  const easterBunnyHQ1 = new EasterBunnyHQ(paths);
  success(`Part 1: ${easterBunnyHQ1.part1()}`);

  const easterBunnyHQ2 = new EasterBunnyHQ(paths);
  success(`Part 2: ${easterBunnyHQ2.part2()}`);

  end();
};
