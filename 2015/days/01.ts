import { getAsSingleLine } from '../input';
import { success } from '../utils/logger';

export default async () => {
  const instructions = getAsSingleLine('01.txt').split('');

  const finalFloor = instructions.reduce(
    (acc, curr) => acc + calcFloorLevel(curr),
    0
  );

  success(`Part 1: ${finalFloor}`);

  let currentFloor = 0;

  for (let i = 0; i < instructions.length; i++) {
    currentFloor += calcFloorLevel(instructions[i] as string);

    if (currentFloor === -1) {
      success(`Part 2: ${i + 1}`);
      break;
    }
  }
};

const calcFloorLevel = (value: string): number => (value === '(' ? 1 : -1);
