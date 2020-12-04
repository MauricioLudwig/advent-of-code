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
