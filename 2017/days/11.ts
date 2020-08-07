import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

interface Coordinate {
  x: number;
  y: number;
  z: number;
}

interface IHexGrid {
  [key: string]: Coordinate;
}

const HexGrid: IHexGrid = {
  n: {
    x: 0,
    y: 1,
    z: -1,
  },
  ne: {
    x: 1,
    y: 0,
    z: -1,
  },
  se: {
    x: 1,
    y: -1,
    z: 0,
  },
  s: {
    x: 0,
    y: -1,
    z: 1,
  },
  sw: {
    x: -1,
    y: 0,
    z: 1,
  },
  nw: {
    x: -1,
    y: 1,
    z: 0,
  },
};

export default (): void => {
  const path = getAsSingleLine('11.txt').split(',');
  const position: Coordinate = {
    x: 0,
    y: 0,
    z: 0,
  };
  let maxDistance = 0;

  path.forEach((o): void => {
    const { x, y, z } = HexGrid[o];

    position.x += x;
    position.y += y;
    position.z += z;

    const distance = calcHexGridDistance(position);
    if (distance > maxDistance) {
      maxDistance = distance;
    }
  });

  success(`Part 1: ${calcHexGridDistance(position)}`);
  success(`Part 2: ${maxDistance}`);
  end();
};

const calcHexGridDistance = ({ x, y, z }: Coordinate): number =>
  (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;
