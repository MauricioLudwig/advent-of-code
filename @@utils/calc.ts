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
