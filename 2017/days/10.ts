import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

export class KnotHash {
  ls: number[] = [];
  currentPosition = 0;
  skipSize = 0;

  constructor() {
    this.ls = Array.from(Array(256).keys()).map(Number);
  }

  hash(input: number[], iterations: number): void {
    for (let i = 0; i < iterations; i++) {
      input.forEach((n): void => {
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
      });
    }
  }

  private denseHash(): number[] {
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

  hexa(): string {
    return this.denseHash()
      .map((o): string => {
        const hexa = o.toString(16);
        if (hexa.length === 1) {
          return `0${hexa}`;
        }

        return hexa;
      })
      .join('');
  }
}

export default (): void => {
  const input = getAsSingleLine('10.txt').split(',').map(Number);

  const knotHash1 = new KnotHash();
  knotHash1.hash(input, 1);
  const [n1, n2] = knotHash1.ls;
  success(`Part 1: ${n1 * n2}`);

  const ascii = [
    ...convertToAscii(getAsSingleLine('10.txt')),
    17,
    31,
    73,
    47,
    23,
  ];

  const knotHash2 = new KnotHash();
  knotHash2.hash(ascii, 64);
  success(`Part 2: ${knotHash2.hexa()}`);

  end();
};

export const convertToAscii = (str: string): number[] =>
  str.split('').map((o): number => o.charCodeAt(0));
