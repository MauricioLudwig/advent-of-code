import { success } from "../utils/logger";

const NUM_OF_ELVES = 3014603;

export default (): void => {
  const sum1 = Math.abs(Math.pow(2, 21) - NUM_OF_ELVES) * 2 + 1;
  success(`Part 1: ${sum1}`);
};
