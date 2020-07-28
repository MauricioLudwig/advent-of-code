import { success, end } from '../utils/logger';

class Generator {
  divisor = 2147483647;

  constructor(public value: number, public factor: number) {}

  generateNextValue() {
    this.value = (this.value * this.factor) % this.divisor;
  }

  get binary() {
    return this.value.toString(2);
  }
}

export default (): void => {
  const genA = new Generator(289, 16807);
  const genB = new Generator(629, 48271);

  let judgeCount = 0;

  for (let i = 0; i < 40e6; i++) {
    genA.generateNextValue();
    genB.generateNextValue();

    const binA = genA.binary;
    const binB = genB.binary;

    if (binA.substring(binA.length - 16) === binB.substring(binB.length - 16)) {
      judgeCount++;
    }
  }

  success(`Part 1: ${judgeCount}`);
  end();
};
