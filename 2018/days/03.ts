import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface IGrid {
  [key: string]: {
    [key: string]: null | number;
  };
}

interface IAreas {
  [key: string]: number;
}

export default (): void => {
  const input = getAsArray('03.txt');

  const grid: IGrid = {};

  input.forEach((o): void => {
    const [id, , offset, dimensions] = o.split(' ');
    const coordinates = getCoordinates(offset, dimensions, id);
    Object.keys(coordinates).forEach((k): void => {
      const pointsX = coordinates[k];
      if (grid.hasOwnProperty(k)) {
        const pointY = grid[k];
        Object.keys(pointsX).forEach((o) => {
          if (pointY.hasOwnProperty(o)) {
            pointY[o] = null;
          } else {
            pointY[o] = coordinates[k][o];
          }
        });
      } else {
        grid[k] = {};
        Object.keys(pointsX).forEach((o) => {
          grid[k][o] = coordinates[k][o];
        });
      }
    });
  });

  const overlap = Object.keys(grid).reduce((acc, curr) => {
    const x = grid[curr];
    return acc + Object.values(x).filter((o) => o === null).length;
  }, 0);

  success(`Part 1: ${overlap}`);

  const areas: IAreas = {};

  input.forEach((o): void => {
    const [id, , , dimensions] = o.split(' ');
    const [width, height] = getDigits(dimensions);
    areas[id] = width * height;
  });

  Object.keys(areas).forEach((k): void => {
    const [, id] = getDigits(k);
    const area = areas[k];

    const a = Object.values(grid).reduce((acc, curr): number => {
      return acc + Object.values(curr).filter((x) => x === id).length;
    }, 0);

    if (area === a) {
      success(`Part 2: ${id}`);
    }
  });

  end();
};

const getDigits = (str: string): number[] => {
  const pattern = new RegExp(/\D/, 'gi');
  return str.replace(pattern, ' ').split(' ').map(Number);
};

type GetCoordinates = (offset: string, dimensions: string, id: string) => IGrid;

const getCoordinates: GetCoordinates = (offset, dimensions, id) => {
  const [x0, y0] = getDigits(offset);
  const [width, height] = getDigits(dimensions);
  const [, gridId] = getDigits(id);

  const coordinates: IGrid = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pointY = y + y0;
      const pointX = x + x0;
      if (coordinates.hasOwnProperty(pointY)) {
        coordinates[pointY][pointX] = gridId;
      } else {
        coordinates[pointY] = {};
        coordinates[pointY][pointX] = gridId;
      }
    }
  }

  return coordinates;
};
