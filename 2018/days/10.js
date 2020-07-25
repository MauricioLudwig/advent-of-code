import chalk from 'chalk';
import { getAsArray } from '../input/index.js';
import { sleep } from '../utils/helper-functions.js';
import { end } from '../utils/logger.js';

export default async () => {
  const input = getAsArray('10.txt');

  const points = input.map((o) => {
    const [, posX, posY, velX, velY] = o.match(/position=<(.+),(.+)> velocity=<(.+),(.+)>/);
    return {
      initial: {
        x: parseInt(posX, 10),
        y: parseInt(posY, 10)
      },
      position: {
        x: parseInt(posX, 10),
        y: parseInt(posY, 10)
      },
      velocity: {
        x: parseInt(velX, 10),
        y: parseInt(velY, 10)
      }
    }
  });

  const maxManhattanDistance = 100;
  const seconds = 1000000;

  for (let i = 0; i < seconds; i++) {
    points.forEach(point => {
      point.position.x = point.position.x + point.velocity.x;
      point.position.y = point.position.y + point.velocity.y;
    });

    const coordsX = points.map(o => o.position.x);
    const coordsY = points.map(o => o.position.y);

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
        if (points.some(p => p.position.x === x && p.position.y === y)) {
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