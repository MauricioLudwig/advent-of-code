import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

class KnotHash {
  currentPosition = 0;
  skipSize = 0;

  constructor(public ls: number[]) {}

  hash(n: number): void {
    const subLs: number[] = [];

    for (let i = 0; i < n; i++) {
      subLs.push(this.ls[(this.currentPosition + i) % this.ls.length]);
    }

    subLs.reverse();

    for (let i = 0; i < n; i++) {
      this.ls[(this.currentPosition + i) % this.ls.length] = subLs[i];
    }

    this.currentPosition += n + this.skipSize;
    this.currentPosition = this.currentPosition % this.ls.length;
    this.skipSize++;
  }

  get multiplyFirstTwoDigits(): number {
    const [n1, n2] = this.ls;
    return n1 * n2;
  }

  get denseHash(): number[] {
    const ls = Array.from(this.ls);
    const denseHash: number[] = [];

    while (ls.length > 0) {
      const subLs = ls.splice(0, 16);
      denseHash.push(
        subLs.reduce((acc, curr): number => {
          return acc ^ curr;
        }, 0)
      );
    }

    return denseHash;
  }
}

export default (): void => {
  const input = getAsSingleLine('10.txt').split(',').map(Number);
  const ls = Array.from(Array(256).keys()).map(Number);

  const knotHash1 = new KnotHash([...ls]);

  input.forEach((n): void => {
    knotHash1.hash(n);
  });

  success(`Part 1: ${knotHash1.multiplyFirstTwoDigits}`);

  const ascii = [
    ...convertToAscii(getAsSingleLine('10.txt')),
    17,
    31,
    73,
    47,
    23,
  ];

  const knotHash2 = new KnotHash([...ls]);

  for (let i = 0; i < 64; i++) {
    ascii.forEach((n): void => {
      knotHash2.hash(n);
    });
  }

  const denseHash = knotHash2.denseHash;
  const hexaStr = denseHash.map((o): string => o.toString(16)).join('');
  success(`Part 2: ${hexaStr}`);

  end();
};

const convertToAscii = (str: string): number[] =>
  str.split('').map((o): number => o.charCodeAt(0));
