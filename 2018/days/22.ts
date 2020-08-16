import { success, end } from '../utils/logger';

enum Type {
  ROCKY = 0,
  WET = 1,
  NARROW = 2,
}

interface ICoordinate {
  x: number;
  y: number;
}

interface IRegion {
  type: Type;
  erosionLevel: number;
}

export default (): void => {
  const cave: IRegion[][] = [];

  const depth = 11739;
  const target: ICoordinate = {
    x: 11,
    y: 718,
  };

  for (let y = 0; y <= target.y; y++) {
    cave[y] = [];

    for (let x = 0; x <= target.x; x++) {
      const geoIndex = getGeoIndex(x, y, target, cave);
      const erosionLevel = getErosionLevel(geoIndex, depth);
      cave[y].push({
        type: getRegionType(erosionLevel),
        erosionLevel,
      });
    }
  }

  const riskLevel = cave.flat().reduce((acc, curr): number => {
    return acc + curr.type;
  }, 0);

  success(`Part 1: ${riskLevel}`);
  end();
};

type GetGeoIndex = (
  x: number,
  y: number,
  target: ICoordinate,
  cave: IRegion[][]
) => number;

const getGeoIndex: GetGeoIndex = (x, y, target, cave) => {
  switch (true) {
    case x === 0 && y === 0:
    case x === target.x && y === target.y:
      return 0;
    case y === 0:
      return x * 16807;
    case x === 0:
      return y * 48271;
    default:
      return cave[y][x - 1].erosionLevel * cave[y - 1][x].erosionLevel;
  }
};

type GetErosionLevel = (geoIndex: number, depth: number) => number;

const getErosionLevel: GetErosionLevel = (geoIndex, depth) =>
  (geoIndex + depth) % 20183;

const getRegionType = (erosionLevel: number): Type => {
  const level = erosionLevel % 3;

  switch (level) {
    case 0:
      return Type.ROCKY;
    case 1:
      return Type.WET;
    case 2:
      return Type.NARROW;
    default:
      throw new Error(`No case matched: ${level}`);
  }
};
