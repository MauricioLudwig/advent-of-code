import { success, end } from '../utils/logger';

class Spinlock {
  position = 0;
  buffer = [0];

  constructor(public iterations: number, public increment: number) {}

  part1(): number {
    for (let i = 1; i <= this.iterations; i++) {
      const index = (this.position + this.increment) % this.buffer.length;
      this.buffer.splice(index + 1, 0, i);
      this.position = index + 1;
    }

    const index = this.buffer.indexOf(this.iterations);
    return this.buffer[index + 1];
  }

  part2(): number {
    let n = 0;

    for (let i = 1; i <= this.iterations; i++) {
      const index = (this.position + this.increment) % i;
      this.position = index + 1;

      if (index === 0) {
        n = i;
      }
    }

    return n;
  }
}

export default (): void => {
  const spinlock1 = new Spinlock(2017, 377);
  success(`Part 1: ${spinlock1.part1()}`);

  const spinlock2 = new Spinlock(50e6, 377);
  success(`Part 2: ${spinlock2.part2()}`);

  end();
};
