export const getPrimeFactorization = (n: number): number[] => {
  const validNums: number[] = [];
  let factor = 2;
  let currentNum = n;

  while (currentNum > 1) {
    if (currentNum % factor === 0) {
      validNums.push(factor);
      currentNum /= factor;
    } else {
      factor++;
    }
  }

  return validNums;
};

export const calcManhattanDistance = (p1: number[], p2: number[]): number => {
  if (p1.length !== p2.length) {
    throw new Error("Uneven number of coordinates.");
  }

  return p1.reduce((acc, curr, index): number => {
    return acc + Math.abs(curr - p2[index]!);
  }, 0);
};
