type CalcManhattanDistance = (pointA: number[], pointB: number[]) => number;

export const calcManhattanDistance: CalcManhattanDistance = (p1, p2) => {
  if (p1.length !== p2.length) {
    throw new Error('Uneven number of coordinates.');
  }

  return p1.reduce((acc, curr, index): number => {
    return acc + Math.abs(curr - p2[index]);
  }, 0);
};
