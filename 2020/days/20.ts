import { getAsMatrix, Divisor } from '../input';
import { success } from '../utils/logger';

type TImage = {
  id: number;
  grid: string[][];
};

export default (): void => {
  const images: Record<number, TImage> = getAsMatrix(
    '20.txt',
    Divisor.NewLine
  ).reduce((acc, curr) => {
    const [s1, ...arr] = curr;
    const [, n] = s1.match(/(\d+)/) || [];
    const id = parseInt(n, 10);

    return {
      ...acc,
      [id]: {
        id,
        grid: arr.map((o) => o.split('')),
      },
    };
  }, {} as Record<number, TImage>);

  let cornerTilesSum = 1;

  for (const [_, value] of Object.entries(images)) {
    const restImages = Object.values(images).filter((o) => o.id !== value.id);
    const matches = restImages.reduce(
      (acc, curr) => acc + checkEdgeArrangement(value.grid, curr.grid),
      0
    );

    // (+2 for flipped image matches)
    if (matches === 4) {
      cornerTilesSum *= value.id;
    }
  }

  success(`Part 1: ${cornerTilesSum}`);
  success(`Part 2:`);
};

const checkEdgeArrangement = (
  currentImage: string[][],
  checkImage: string[][]
): number => {
  const currentImgEdges = getEdges(currentImage);
  const checkImgEdges = getEdges(checkImage);

  return currentImgEdges.reduce(
    (acc, curr) => acc + (checkImgEdges.includes(curr) ? 1 : 0),
    0
  );
};

const getEdges = (image: string[][]): string[] => {
  let edges: string[][] = [];

  edges.push(Array.from(image[0]));
  edges.push(Array.from(image[image.length - 1]));

  for (let x = 0; x < 1; x++) {
    let leftEdge: string[] = [];
    let rightEdge: string[] = [];

    for (let y = 0; y < image.length; y++) {
      rightEdge.push(image[y][image.length - 1]);
      leftEdge.push(image[y][x]);
    }

    edges.push(Array.from(rightEdge));
    edges.push(Array.from(leftEdge));
  }

  edges.push(...edges.map((o) => [...o].reverse()));
  return edges.map((o) => [...o].join(''));
};
