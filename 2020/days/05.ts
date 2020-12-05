// @ts-nocheck
import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const input = getAsArray('05.txt');

  const part1 = input
    .map((o) => {
      let seats = Array(128)
        .fill(0)
        .map((_, i) => i);

      let combination = o.split('');
      let ls = combination.splice(0, 7);

      while (true) {
        const e = ls.shift();
        if (e === 'F') {
          seats = seats.slice(0, seats.length / 2);
        } else {
          seats.splice(0, seats.length / 2);
        }

        if (seats.length === 1) {
          break;
        }
      }

      let column = Array(8)
        .fill(0)
        .map((_, i) => i);

      while (true) {
        const e = combination.shift();
        if (e === 'L') {
          column = column.slice(0, column.length / 2);
        } else {
          column.splice(0, column.length / 2);
        }

        if (column.length === 1) {
          break;
        }
      }

      return seats.shift() * 8 + column.shift();
    })
    .sort((a, b) => b - a);

  const [max] = part1;
  const min = part1[part1.length - 1];

  const [seatId] = Array(max - min)
    .fill(0)
    .map((_, i) => i + min)
    .filter((o) => !part1.includes(o));

  success(`Part 1: ${max}`);
  success(`Part 2: ${seatId}`);
};
