export const arrangeByOccurrence = (
  arr: Array<string | number>
): Record<string, number> =>
  arr.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: acc[curr] ? acc[curr] + 1 : 1,
    }),
    {} as Record<string, number>
  );

export const generateBitPermutation = (n: number): number[][] => {
  let bits: number[][] = [Array(n).fill(0)];
  let i = 0;

  while (i < n) {
    bits = bits
      .map((bit) => {
        const c1 = [...bit];
        const c2 = [...bit];
        c1[i] = 0;
        c2[i] = 1;
        return [c1, c2];
      })
      .flat();

    i++;
  }

  return bits;
};
