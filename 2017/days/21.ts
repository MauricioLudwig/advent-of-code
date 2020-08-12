import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface IRule {
  condition: string[];
  produce: string;
}

class Matrix {
  static toString(m: string[][]): string {
    return m.map((o): string => o.join('')).join('/');
  }

  static fromString(pattern: string): string[][] {
    return pattern.split('/').map((o): string[] => o.split(''));
  }

  static join(matrix: string[][][][]): string[][] {
    const m: string[][] = [];
    const size = matrix.length * matrix[0][0].length;

    for (let i = 0; i < size; i++) {
      m[i] = [];
    }

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0, xLen = matrix[y].length; x < xLen; x++) {
        const node = matrix[y][x]; // matrix within matrix

        for (let nodeY = 0; nodeY < node.length; nodeY++) {
          const nodeXLen = node[nodeY].length;

          for (let nodeX = 0; nodeX < nodeXLen; nodeX++) {
            const yIndex = y * node.length + nodeY; // index along (outer matrix) y-axis
            m[yIndex].push(node[nodeY][nodeX]);
          }
        }
      }
    }

    return m;
  }

  static divide(matrix: string[][]): string[][][][] {
    const size = matrix.length % 2 === 0 ? 2 : 3;
    const m: string[][][][] = [];

    for (let y = 0; y < matrix.length; y += size) {
      const mRow: string[][][] = [];

      for (let x = 0, xLen = matrix[0].length; x < xLen; x += size) {
        const mCol: string[][] = [];
        const myLen = y + size;

        for (let mY = y; mY < myLen; mY++) {
          const node: string[] = [];
          const mXLen = x + size;

          for (let mX = x; mX < mXLen; mX++) {
            node.push(matrix[mY][mX]);
          }

          mCol.push(Array.from(node));
        }

        mRow.push(mCol.map((o): string[] => Array.from(o)));
      }

      m.push(
        mRow.map((r): string[][] => r.map((c): string[] => Array.from(c))) // avoid reference hell
      );
    }

    return m;
  }

  static rotate(matrix: string[][]): string[][] {
    let m: string[][] = [];

    for (let x = 0; x < matrix.length; x++) {
      let row: string[] = [];

      for (let y = 0, yLen = matrix[x].length; y < yLen; y++) {
        row.push(matrix[y][x]);
      }

      m.push(Array.from(row).reverse());
    }

    return m;
  }
}

export default (): void => {
  const rules = getAsArray('21.txt').map(
    (o): IRule => {
      const [condition, produce] = o.split(' => ');
      return {
        condition: getOrientations(condition),
        produce,
      };
    }
  );

  let matrix = Matrix.fromString('.#./..#/###');

  for (let i = 0; i < 5; i++) {
    matrix = enhanceImage(matrix, rules);
  }

  success(`Part 1: ${getPixelCount(matrix)}`);

  // for a total of 18 iterations (i)
  for (let i = 0; i < 13; i++) {
    matrix = enhanceImage(matrix, rules);
  }

  success(`Part 2: ${getPixelCount(matrix)}`);

  end();
};

const enhanceImage = (matrix: string[][], rules: IRule[]) => {
  const decomposedMatrix = Matrix.divide(matrix).map((r): string[][][] => {
    return r.map((c): string[][] => {
      const pattern = Matrix.toString(c);
      const rule = rules.find((r) => r.condition.includes(pattern));

      if (!rule) {
        throw new Error('No matching rule found.');
      }

      return Matrix.fromString(rule.produce);
    });
  });

  return Matrix.join(decomposedMatrix);
};

const getPixelCount = (matrix: string[][]) =>
  matrix.flat().filter((o) => o === '#').length;

const getOrientations = (pattern: string): string[] => {
  let orientations: string[] = [];
  let matrix = Matrix.fromString(pattern);
  let flipped = matrix.map((o) => Array.from(o).reverse());

  for (let i = 0; i < 4; i++) {
    matrix = Matrix.rotate(Array.from(matrix.map((o) => Array.from(o))));
    flipped = Matrix.rotate(Array.from(flipped.map((o) => Array.from(o))));

    orientations.push(Matrix.toString(matrix));
    orientations.push(Matrix.toString(flipped));
  }

  return orientations;
};
