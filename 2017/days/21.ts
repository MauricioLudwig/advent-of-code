import { getAsArray } from "../input";
import { success, end } from "../utils/logger";

interface IRule {
  condition: string[];
  produce: string;
}

class Matrix {
  constructor(
    public pattern: string,
    public rows: number,
    public cols: number
  ) {}
}

export default (): void => {
  const rules = getAsArray("21.txt").map(
    (o): IRule => {
      const [condition, produce] = o.split(" => ");
      return {
        condition: getOrientations(condition),
        produce,
      };
    }
  );

  const matrix = new Matrix(".#./..#/###", 3, 3);

  for (let i = 0; i < 18; i++) {
    const xyz = divideMatrix(fromString(matrix.pattern)).map((o) => {
      return o.map((x) => {
        const rule = rules.find((r) => r.condition.includes(toString(x)));

        if (!rule) {
          throw new Error("No matching rule found.");
        }

        return fromString(rule.produce);
      });
    });
    
    matrix.pattern = toString(joinMatrix(xyz));
  }

  console.log('PIXELS', getPixelCount(fromString(matrix.pattern)));
  success(null);
  end();
};

const joinMatrix = (matrix: string[][][][]): string[][] => {
  const m: string[][] = [];

  const ySize = (matrix.length) * matrix[0][0].length;

  for (let i = 0; i < ySize; i++) {
    m[i] = [];
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const c = matrix[y][x];

      for (let cY = 0; cY < c.length; cY++) {
        for (let cX = 0; cX < c[cY].length; cX++) {
          const yIndex = y * c.length + cY;
          m[yIndex].push(c[cY][cX]);
        }
      }
    }
  }

  return m;
};

const getPixelCount = (matrix: string[][]) =>
  matrix.flat().filter((o) => o === "#").length;

const divideMatrix = (matrix: string[][]): string[][][][] => {
  const size = matrix.length % 2 === 0 ? 2 : 3;
  const m: string[][][][] = [];

  for (let y = 0; y < matrix.length; y += size) {
    const mRow: string[][][] = [];

    for (let x = 0; x < matrix[0].length; x += size) {
      const mCol: string[][] = [];

      for (let mY = y; mY < y + size; mY++) {
        const node: string[] = [];

        for (let mX = x; mX < x + size; mX++) {
          node.push(matrix[mY][mX]);
        }

        mCol.push([...node]);
      }

      mRow.push(mCol.map((o) => [...o]));
    }

    m.push(JSON.parse(JSON.stringify(mRow)));
  }

  return m;
};

const toString = (matrix: string[][]): string =>
  matrix.map((o): string => o.join("")).join("/");

const fromString = (pattern: string): string[][] =>
  pattern.split("/").map((o): string[] => o.split(""));

const getOrientations = (pattern: string): string[] => {
  let orientations: string[] = [];
  let matrix = fromString(pattern);
  let flipped = matrix.map((o) => Array.from(o).reverse());

  for (let i = 0; i < 4; i++) {
    matrix = rotateMatrix(Array.from(matrix.map((o) => Array.from(o))));
    flipped = rotateMatrix(Array.from(flipped.map((o) => Array.from(o))));

    orientations.push(toString(matrix));
    orientations.push(toString(flipped));
  }

  return orientations;
};

const rotateMatrix = (matrix: string[][]): string[][] => {
  let cols: string[][] = [];

  for (let x = 0; x < matrix.length; x++) {
    let row: string[] = [];

    for (let y = 0; y < matrix[x].length; y++) {
      row.push(matrix[y][x]);
    }

    cols.push([...row.reverse()]);
  }

  return cols;
};
