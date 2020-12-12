import { getAsArray } from '../input';
import { success } from '../utils/logger';

type TAction = {
  action: string;
  value: number;
};

type TPosition = {
  x: number;
  y: number;
};

const leftDirection = ['N', 'W', 'S', 'E'];
const rightDirection = ['N', 'E', 'S', 'W'];

export default async (): Promise<void> => {
  const input: Array<TAction> = getAsArray('12.txt').map((o) => {
    const match = o.match(/(\w{1})(\d+)/);

    if (!match) {
      throw new Error('No match found.');
    }

    const [, action, value] = match;
    return {
      action,
      value: parseInt(value, 10),
    };
  });

  let currentDirection = 'E';
  let waypoint = {
    x: 10,
    y: 1,
  };
  const position = {
    x: 0,
    y: 0,
  };

  input.forEach((o) => {
    currentDirection = handleAction(o, position, waypoint, currentDirection);
    // console.log('position', position);
    // console.log('waypoint', waypoint);
  });

  const manDis = Math.abs(position.x) + Math.abs(position.y);

  success(`Part 1: ${manDis}`);
  success(`Part 2:`);
};

const handleAction = (
  action: TAction,
  position: TPosition,
  waypoint: TPosition,
  currentDirection: string
): string => {
  let direction = currentDirection;

  switch (action.action) {
    case 'N':
      // position.y += action.value;
      waypoint.y += action.value;
      break;
    case 'S':
      // position.y -= action.value;
      waypoint.y -= action.value;
      break;
    case 'E':
      // position.x += action.value;
      waypoint.x += action.value;
      break;
    case 'W':
      // position.x -= action.value;
      waypoint.x -= action.value;
      break;
    case 'L':
    case 'R':
      const angle = action.value / 90;
      let xDir = '';
      let yDir = '';

      if (action.action === 'L') {
        const xi = (waypoint.x > 0 ? 3 : 1) + angle;
        const yi = (waypoint.y > 0 ? 0 : 2) + angle;
        xDir = leftDirection[xi % leftDirection.length];
        yDir = leftDirection[yi % leftDirection.length];
      } else {
        const xi = (waypoint.x > 0 ? 1 : 3) + angle;
        const yi = (waypoint.y > 0 ? 0 : 2) + angle;
        xDir = rightDirection[xi % rightDirection.length];
        yDir = rightDirection[yi % rightDirection.length];
      }

      let tempY = waypoint.y;
      let tempX = waypoint.x;

      switch (xDir) {
        case 'N':
          tempY = Math.abs(waypoint.x);
          break;
        case 'S':
          tempY = Math.abs(waypoint.x) * -1;
          break;
        case 'E':
          tempX = Math.abs(waypoint.x);
          break;
        case 'W':
          tempX = Math.abs(waypoint.x) * -1;
          break;
      }

      switch (yDir) {
        case 'N':
          tempY = Math.abs(waypoint.y);
          break;
        case 'S':
          tempY = Math.abs(waypoint.y) * -1;
          break;
        case 'E':
          tempX = Math.abs(waypoint.y);
          break;
        case 'W':
          tempX = Math.abs(waypoint.y) * -1;
          break;
      }

      waypoint.x = tempX;
      waypoint.y = tempY;
      // PART 1
      // if (action.action === 'L') {
      //   const leftIndex = leftDirection.indexOf(currentDirection) + angle;
      //   direction = leftDirection[leftIndex % leftDirection.length];
      // } else {
      //   console.log(rightDirection.indexOf(currentDirection));
      //   const rightIndex = rightDirection.indexOf(currentDirection) + angle;
      //   direction = rightDirection[rightIndex % rightDirection.length];
      // }
      break;
    case 'F':
      position.y += waypoint.y * action.value;
      position.x += waypoint.x * action.value;
      break;
      // PART 1
      switch (direction) {
        case 'N':
          position.y += waypoint.y * action.value;
          // position.y += action.value;
          break;
        case 'S':
          position.y -= waypoint.y * action.value;
          // position.y -= action.value;
          break;
        case 'E':
          position.x += waypoint.x * action.value;
          // position.x += action.value;
          break;
        case 'W':
          position.x -= waypoint.x * action.value;
          // position.x -= action.value;
          break;
      }
      break;
    default:
      throw new Error('!');
  }

  return direction;
};
