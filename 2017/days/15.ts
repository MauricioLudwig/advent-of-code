import { performance } from 'perf_hooks';
import { success, end, logPerformance } from '../utils/logger';

/*
  -- Reflection

  Using toString(2) to convert string to binary, then comparing the last 16 bits
  yielded a correct answer but with an execution time of 57.87 seconds (Part 1).

  Improving upon the previous solution, I instead opt for the bitwise AND operation, on each value, against
  the string 0xFFFF, whose binary representation is 16 1's. On a bit level we can then compare the two values.
  This approach yields a correct answer but with a significantly improved execution time of 0.77 seconds.

  The aforementioned approach yields an execution time of 1.88 seconds for Part 2.
*/

class Generator {
  divisor = 2147483647;

  constructor(
    public value: number,
    public factor: number,
    public multiple: number
  ) {}

  generateNextValue() {
    this.value = (this.value * this.factor) % this.divisor;
    return this.value;
  }

  generateNextMultipleValue() {
    while (true) {
      this.generateNextValue();

      if (this.value % this.multiple === 0) {
        break;
      }
    }

    return this.value;
  }
}

export default (): void => {
  const genA1 = new Generator(65, 16807, 4);
  const genB1 = new Generator(8921, 48271, 8);

  let judgeCount1 = 0;
  const t1 = performance.now();

  for (let i = 0; i < 40e6; i++) {
    const a = genA1.generateNextValue();
    const b = genB1.generateNextValue();

    if ((a & 0xffff) === (b & 0xffff)) {
      judgeCount1++;
    }
  }

  const t2 = performance.now();
  logPerformance(t2, t1);
  success(`Part 1: ${judgeCount1}`);

  const genA2 = new Generator(289, 16807, 4);
  const genB2 = new Generator(629, 48271, 8);

  let judgeCount2 = 0;
  const t3 = performance.now();

  for (let i = 0; i < 5e6; i++) {
    const a = genA2.generateNextMultipleValue();
    const b = genB2.generateNextMultipleValue();

    if ((a & 0xffff) === (b & 0xffff)) {
      judgeCount2++;
    }
  }

  const t4 = performance.now();
  logPerformance(t4, t3);
  success(`Part 2: ${judgeCount2}`);

  end();
};
