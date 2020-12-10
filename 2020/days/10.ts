import { getAsNumbersArray } from '../input';
import { success } from '../utils/logger';

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
  return;

  const reverseJolts = [0, ...jolts, builtInJoltageAdapter].reverse();

  const numOfArrangements = backtrack(reverseJolts, builtInJoltageAdapter);

  success(`Part 2: ${numOfArrangements}`);
};

const backtrack = (
  jolts: Array<number>,
  currentJolt: number,
  visitedJolts: Array<number> = []
): number => {
  const lastJolts = jolts.filter(
    (jolt) =>
      currentJolt - jolt <= 3 && currentJolt - jolt >= 1 && currentJolt !== jolt
  );

  if (lastJolts.length === 0) {
    return 1;
  }

  const nextJolts = lastJolts.filter((o) => !visitedJolts.includes(o));
  visitedJolts.push(...lastJolts);

  console.log('nextJolts', nextJolts);

  return (
    (nextJolts.length === 1 ? 1 : nextJolts.length) *
    nextJolts.reduce(
      (acc, curr) => acc + backtrack(jolts, curr, visitedJolts),
      1
    )
  );
};
