import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

export default (): void => {
  const triangles = getAsArray('03.txt').map((o) =>
    o.trim().split(/\s+/).map(Number)
  );

  const validRowTriangles = triangles.reduce((acc, curr) => {
    return acc + (isValidTriangle(curr) ? 1 : 0);
  }, 0);

  success(`Part 1: ${validRowTriangles}`);

  let validColTriangles = 0;

  for (let i = 0; i < 3; i++) {
    for (let y = 0; y < triangles.length; y += 3) {
      const col = [triangles[y][i], triangles[y + 1][i], triangles[y + 2][i]];

      if (isValidTriangle(col)) {
        validColTriangles++;
      }
    }
  }

  success(`Part 2: ${validColTriangles}`);

  end();
};

const isValidTriangle = (arr: number[]): boolean => {
  const [n1, n2, n3] = [...arr].sort((a, b) => a - b);
  return n1 + n2 > n3;
};
