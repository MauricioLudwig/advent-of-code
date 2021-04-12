// @ts-nocheck
import { getAsArray } from '../input';
import { success } from '../utils/logger';

type TLight = {
  brightness: number;
  turnedOn: boolean;
};

type TInstruction = {
  type: 'toggle' | 'turn off' | 'turn on';
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
  };
};

export default async () => {
  const instructions: Array<TInstruction> = getAsArray('06.txt').map((o) => {
    const match = o.match(
      /(turn off|toggle|turn on) ([0-9,]+) through ([0-9,]+)/
    );

    if (!match) {
      throw new Error(`No match found.`);
    }

    const [_, type, from, to] = match;

    if (!IsCorrectType(type)) {
      throw new Error(`error: ${type}`);
    }

    const [x0, y0] = from?.split(',').map(Number) as number[];
    const [x1, y1] = to?.split(',').map(Number) as number[];

    return {
      type,
      from: {
        x: x0!,
        y: y0!,
      },
      to: {
        x: x1!,
        y: y1!,
      },
    };
  });

  const grid: TLight[][] = Array(1000)
    .fill(0)
    .map(() =>
      Array(1000)
        .fill(0)
        .map(() => ({
          brightness: 0,
          turnedOn: false,
        }))
    );

  instructions.forEach((o) => {
    const { type, from, to } = o;

    for (let x = from.x; x <= to.x; x++) {
      for (let y = from.y; y <= to.y; y++) {
        switch (type) {
          case 'toggle':
            grid[x][y]?.brightness += 2;
            grid[x][y]?.turnedOn = !grid[x][y]?.turnedOn;
            break;
          case 'turn off':
            if (grid[x][y]?.brightness > 0) {
              grid[x][y]?.brightness -= 1;
            }
            grid[x][y]?.turnedOn = false;
            break;
          case 'turn on':
            grid[x][y]?.brightness += 1;
            grid[x][y]?.turnedOn = true;
            break;
        }
      }
    }
  });

  const numOfLights = grid.flat().filter((o) => o.turnedOn).length;
  success(`Part 1: ${numOfLights}`);

  const totalBrightness = grid
    .flat()
    .reduce((acc, curr) => acc + curr.brightness, 0);
  success(`Part 2: ${totalBrightness}`);
};

const IsCorrectType = (
  type: string | undefined
): type is 'toggle' | 'turn off' | 'turn on' => {
  return (
    typeof type === 'string' && ['toggle', 'turn off', 'turn on'].includes(type)
  );
};
