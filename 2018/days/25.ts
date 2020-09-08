import { getAsArray } from '../input';
import { success, end } from '../utils/logger';
import { calcManhattanDistance } from '../utils/math';

interface IPoint {
  id: string;
  coordinates: number[];
}

export default (): void => {
  const points = getAsArray('25.txt').map(
    (o): IPoint => ({
      id: o,
      coordinates: o.split(',').map(Number),
    })
  );

  let constellation: Set<string>[] = [];

  points.forEach((point) => {
    const { id, coordinates } = point;

    const constellationPoints = points.filter(
      (o) => calcManhattanDistance(o.coordinates, coordinates) <= 3
    );

    // find and connect with existing constellations
    const keys = [...constellationPoints.map((o) => o.id), id];
    const existingConstellationPoints = constellation
      .filter((o) => keys.some((k) => o.has(k)))
      .reduce((acc, curr) => acc.concat(Array.from(curr)), [] as string[]);
    keys.push(...existingConstellationPoints);

    // add new constellations while removing obsolete ones
    constellation = constellation.filter((o) => !keys.some((k) => o.has(k)));
    constellation.push(new Set(keys));
  });

  success(`Answer: ${constellation.length}`);
  end();
};
