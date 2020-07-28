export const compareSetEquality = <T>(set1: Set<T>, set2: Set<T>): boolean => {
  const mergedSets = new Set([...Array.from(set1), ...Array.from(set2)]);
  return set1.size === mergedSets.size;
};

export const compareArrayEquality = <T>(arr1: T[], arr2: T[]): boolean => {
  return arr1.length === arr2.length && arr1.every((o, i) => o === arr2[i]);
};
