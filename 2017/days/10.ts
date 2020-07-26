import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

export default (): void => {
  const input = getAsSingleLine('10.txt').split(',').map(Number);
  const ls = Array.from(Array(256).keys()).map(Number);

  let currentPosition = 0;
  let skipSize = 0;

  input.forEach((n): void => {
    const subLs: number[] = [];

    for (let i = 0; i < n; i++) {
      subLs.push(ls[(currentPosition + i) % ls.length]);
    }

    subLs.reverse();

    for (let i = 0; i < n; i++) {
      ls[(currentPosition + i) % ls.length] = subLs[i];
    }

    currentPosition += n + skipSize;
    currentPosition = currentPosition % ls.length;
    skipSize++;
  });

  const [n1, n2] = ls;
  success(`Part 1: ${n1 * n2}`);

  end();
};
