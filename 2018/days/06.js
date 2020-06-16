import { getAsArray } from '../input/index.js';
import { success, end } from '../utils/logger.js';

export default () => {
  const input = getAsArray('06.txt');

  const coordinates = input.map((o) => {
    const [, x, y] = o.match(/(\d+), (\d+)/);
    return {
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      infinite: false
    }
  });

  const coordsX = coordinates.map(o => o.x);
  const coordsY = coordinates.map(o => o.y);
  const minPoint = { x: Math.min(...coordsX) - 1, y: Math.min(...coordsY) - 1 };
  const maxPoint = { x: Math.max(...coordsX) + 1, y: Math.max(...coordsY) + 1 };
  const coordsBoundary = getBoundaryCoordinates(minPoint, maxPoint);

  // determine infinite points
  coordsBoundary.forEach(edge => {
    const [minDistance] = coordinates.map(o => {
      const distance = calculateManhattanDistance(o, edge);
      return { distance, ...o };
    }).sort((a, b) => a.distance - b.distance);

    coordinates.filter(c => c.x === minDistance.x && c.y === minDistance.y).forEach(o => o.infinite = true);
  });

  const gridArea = {};
  let regionArea = 0;
  const maxManhattanDistance = 10000;

  for (let y = minPoint.y; y <= maxPoint.y; y++) {
    for (let x = minPoint.x; x < maxPoint.x; x++) {
      const point = { x, y };
      const minDistances = coordinates.map(o => {
        const area = calculateManhattanDistance(o, point);
        return { area, ...o }
      }).sort((a, b) => a.area - b.area);

      const sumDistance = minDistances.reduce((acc, curr) => acc + curr.area, 0);
      if (sumDistance < maxManhattanDistance) {
        regionArea++;
      }

      if (minDistances[0].area !== minDistances[1].area) { // means we have a single coordinate with the shortest manhattan distance
        const [coordinate] = minDistances;
        const key = `${coordinate.x}x${coordinate.y}`;
        if (gridArea.hasOwnProperty(key)) {
          gridArea[key].area = gridArea[key].area + 1;
        } else {
          gridArea[key] = { area: 1, infinite: coordinate.infinite };
        }
      }
    }
  }

  const areas = Object.values(gridArea).filter(o => !o.infinite).map(o => o.area);
  success(`Part 1: ${Math.max(...areas)}`);
  success(`Part 2: ${regionArea}`);

  end();
};

const getBoundaryCoordinates = (minCoord, maxCoord) => {
  const coordinates = [];

  // along x-axis
  for (let i = minCoord.x; i <= maxCoord.x; i++) {
    coordinates.push({ x: i, y: minCoord.y });
    coordinates.push({ x: i, y: maxCoord.y });
  }

  // along y-axis
  for (let i = minCoord.y; i <= maxCoord.y; i++) {
    coordinates.push({ x: minCoord.x, y: i });
    coordinates.push({ x: maxCoord.x, y: i });
  }

  return coordinates;
};

const calculateManhattanDistance = (coordinate, point) => Math.abs(coordinate.y - point.y) + Math.abs(coordinate.x - point.x);