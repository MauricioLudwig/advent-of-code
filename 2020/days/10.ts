import { performance } from 'perf_hooks';
import { getAsNumbersArray } from '../input';
import { success, logPerformance } from '../utils/logger';

export default (): void => {
  const jolts = getAsNumbersArray('10.txt').sort((a, b) => a - b);
  const builtInJoltageAdapter = Math.max(...jolts) + 3;

  let currentJoltage = 0;
  const pastJolts: number[] = [];
  const joltDifferences: number[] = [];

  while (true) {
    const [nextJolt] = jolts.filter(
      (jolt) => !pastJolts.includes(jolt) && jolt - currentJoltage <= 3
    );

    if (!nextJolt) {
      break;
    }

    pastJolts.push(nextJolt);
    joltDifferences.push(nextJolt - currentJoltage);
    currentJoltage = nextJolt;
  }

  const ones = joltDifferences.filter((o) => o === 1).length;
  const threes = joltDifferences.filter((o) => o === 3).length + 1; // builtInJoltageAdapter

  success(`Part 1: ${ones * threes}`);

  const reverseJolts = [...jolts, builtInJoltageAdapter, 0].sort(
    (a, b) => b - a
  );

  const t1 = performance.now();
  const numOfArrangements = backtrack(reverseJolts, builtInJoltageAdapter);
  const t2 = performance.now();

  success(`Part 2: ${numOfArrangements}`);
  logPerformance(t2, t1);
};

const pastNodes: Record<number, number> = {};

const backtrack = (
  jolts: Array<number>,
  currentNode: number,
  combinations: number = 1
): number => {
  const nextJolts = jolts.filter(
    (jolt) =>
      currentNode - jolt <= 3 && currentNode - jolt >= 1 && currentNode !== jolt
  );

  if (nextJolts.length === 0) {
    return 1;
  }

  combinations *= nextJolts.length;
  return nextJolts.reduce((acc, curr) => {
    if (pastNodes[curr]) {
      return acc + pastNodes[curr];
    }

    pastNodes[curr] = backtrack([...jolts], curr, combinations);
    return acc + pastNodes[curr];
  }, 0);
};
