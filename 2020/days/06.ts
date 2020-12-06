// @ts-nocheck
import { getAsArray } from '../input';
import { success } from '../utils/logger';
import { arrangeByOccurrence } from '../utils/array-methods';

export default (): void => {
  const input = getAsArray('06.txt').join(' ').split('  ');

  const part1 = input.reduce((acc, curr) => {
    const x = curr.split(' ');
    const dup = arrangeByOccurrence(x.map((o) => o.split('')).flat());
    return acc + Object.values(dup).filter((o) => o === x.length).length;
    return acc;

    /*
    //  part 1
    const x = curr
      .replace(' ', '')
      .split('')
      .filter((o) => o !== ' ')
      .join('');
    const duplicate = new Set(Array.from(x)).size;
    console.log(duplicate, x);

    return acc + duplicate;

    */
  }, 0);

  success(`Part 1: ${part1}`);
  success(`Part 2: `);
};
