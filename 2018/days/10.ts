import chalk from 'chalk';
import { getAsArray } from '../input';
import { sleep } from '../utils/helper-functions';
import { end } from '../utils/logger';

interface ICoordinate {
  x: number;
  y: number;
}

interface IPoint {
  initial: ICoordinate;
  position: ICoordinate;
  velocity: ICoordinate;
}

export default async (): Promise<void> => {
  const input = getAsArray('10.txt');

  const points = input.map(
    (o): IPoint => {
      const match = o.match(/position=<(.+),(.+)> velocity=<(.+),(.+)>/);

      if (!match) {
        throw new Error('No match found.');
      }

      const [, posX, posY, velX, velY] = match;

      return {
        initial: {
          x: parseInt(posX),
          y: parseInt(posY),
        },
        position: {
          x: parseInt(posX),
          y: parseInt(posY),
        },
        velocity: {
          x: parseInt(velX),
          y: parseInt(velY),
        },
      };
    }
  );

  const maxManhattanDistance = 100;
  const seconds = 1000000;

  for (let i = 0; i < seconds; i++) {
    points.forEach((point): void => {
      point.position.x = point.position.x + point.velocity.x;
      point.position.y = point.position.y + point.velocity.y;
    });

    const coordsX = points.map((o) => o.position.x);
    const coordsY = points.map((o) => o.position.y);

    const minX = Math.min(...coordsX);
    const minY = Math.min(...coordsY);

    const maxX = Math.max(...coordsX);
    const maxY = Math.max(...coordsY);

    const distance = Math.abs(maxY - minY) + Math.abs(maxX - minX);

    if (distance > maxManhattanDistance) {
      continue;
    }

    let visualGrid = '';

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (points.some((p) => p.position.x === x && p.position.y === y)) {
          visualGrid += chalk.bgBlueBright(' ');
        } else {
          visualGrid += '.';
        }
      }
      visualGrid += '\n';
    }

    console.log(chalk.magenta(`\nSecond: ${i + 1}\n`));
    console.log(visualGrid);

    await sleep();
  }

  end();
};
