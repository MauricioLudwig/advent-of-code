import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface INanoBot {
  x: number;
  y: number;
  z: number;
  r: number;
}

export default (): void => {
  const nanoBots = getAsArray('23.txt')
    .map(
      (o): INanoBot => {
        const match = o.match(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/);

        if (!match) {
          throw new Error('No match found.');
        }

        const [, ...digits] = match || [];
        const [x, y, z, r] = digits.map(Number);
        return { x, y, z, r };
      }
    )
    .sort((a, b) => b.r - a.r);

  const [strongestBot] = nanoBots;

  const botsInRange = nanoBots.reduce((acc, curr): number => {
    const distance = calculateManhattanDistance(strongestBot, curr);
    if (distance <= strongestBot.r) {
      return acc + 1;
    }

    return acc;
  }, 0);

  success(`Part 1: ${botsInRange}`);

  end();
};

type CalculateManhattanDistance = (n1: INanoBot, n2: INanoBot) => number;

const calculateManhattanDistance: CalculateManhattanDistance = (n1, n2) =>
  Math.abs(n1.x - n2.x) + Math.abs(n1.y - n2.y) + Math.abs(n1.z - n2.z);
