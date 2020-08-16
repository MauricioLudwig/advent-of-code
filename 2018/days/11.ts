import { success, end } from '../utils/logger';

interface IPowerLevels {
  [key: string]: {
    [key: string]: number;
  };
}

interface IRegionPowerLevels {
  [key: string]: {
    x: number;
    y: number;
    powerLevel: number;
  };
}

export default (): void => {
  const serialNumber = 7511;
  const gridSize = 300;
  const powerLevels: IPowerLevels = {};

  for (let y = 1; y <= gridSize; y++) {
    for (let x = 1; x <= gridSize; x++) {
      if (!powerLevels.hasOwnProperty(y)) {
        powerLevels[y] = {};
      }

      powerLevels[y][x] = calculatePowerLevel(x, y, serialNumber);
    }
  }

  const regionSize = 3;
  const regionPowerLevels: IRegionPowerLevels = {};

  for (let y = 1; y <= gridSize - regionSize; y++) {
    for (let x = 1; x <= gridSize - regionSize; x++) {
      const regionPowerLevel = calculateRegionPowerLevel(
        x,
        y,
        powerLevels,
        regionSize
      );
      const key = `${x},${y}`;
      regionPowerLevels[key] = { x, y, powerLevel: regionPowerLevel };
    }
  }

  const [maxRegionPowerLevel] = Object.values(regionPowerLevels).sort(
    (a, b) => b.powerLevel - a.powerLevel
  );
  success(`Part 1: ${maxRegionPowerLevel.x},${maxRegionPowerLevel.y}`);

  let maxTotalPower = {
    x: 0,
    y: 0,
    powerLevel: 0,
    squareSize: 0,
  };

  for (let y = 1; y <= gridSize; y++) {
    for (let x = 1; x <= gridSize; x++) {
      let squareSize = 1;

      while (true) {
        if (x - 1 + squareSize > gridSize || y - 1 + squareSize > gridSize) {
          break;
        }

        const powerLevel = calculateRegionPowerLevel(
          x,
          y,
          powerLevels,
          squareSize
        );

        if (powerLevel > maxTotalPower.powerLevel) {
          maxTotalPower = {
            x,
            y,
            powerLevel,
            squareSize,
          };
        }

        squareSize++;
      }
    }
  }

  const { x, y, squareSize } = maxTotalPower;
  success(`Part 2: ${x},${y},${squareSize}`);
  end();
};

type CalculateRegionPowerLevel = (
  x: number,
  y: number,
  powerLevels: IPowerLevels,
  squareSize: number
) => number;

const calculateRegionPowerLevel: CalculateRegionPowerLevel = (
  x,
  y,
  powerLevels,
  squareSize
) => {
  let powerLevel = 0;

  for (let i = y; i < y + squareSize; i++) {
    for (let z = x; z < x + squareSize; z++) {
      powerLevel += powerLevels[i][z];
    }
  }

  return powerLevel;
};

type CalculatePowerLevel = (
  x: number,
  y: number,
  serialNumber: number
) => number;

const calculatePowerLevel: CalculatePowerLevel = (x, y, serialNumber) => {
  const rackId = x + 10;
  const num = (rackId * y + serialNumber) * rackId;
  return parseInt(String(num).charAt(String(num).length - 3), 10) - 5;
};
