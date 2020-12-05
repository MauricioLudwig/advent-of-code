import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const seatIds = getAsArray('05.txt')
    .map((o) => {
      let seats = Array(128)
        .fill(0)
        .map((_, i) => i);

      let columnPartition = o.split(''); // seats
      let rowPartition = columnPartition.splice(0, 7); // airplane aisle

      while (rowPartition.length > 0) {
        if (rowPartition.shift() === 'F') {
          seats = seats.slice(0, seats.length / 2);
        } else {
          seats.splice(0, seats.length / 2);
        }
      }

      let columnSeats = Array(8)
        .fill(0)
        .map((_, i) => i);

      while (columnPartition.length > 0) {
        if (columnPartition.shift() === 'L') {
          columnSeats = columnSeats.slice(0, columnSeats.length / 2);
        } else {
          columnSeats.splice(0, columnSeats.length / 2);
        }
      }

      // @ts-ignore
      return seats.shift() * 8 + columnSeats.shift();
    })
    .filter((o) => typeof o === 'number')
    .sort((a, b) => b - a);

  const [max] = seatIds;
  success(`Part 1: ${max}`);

  const min = seatIds[seatIds.length - 1];
  const mySeat = Array(max - min)
    .fill(0)
    .map((_, i) => i + min)
    .find((o) => !seatIds.includes(o));
  success(`Part 2: ${mySeat}`);
};
