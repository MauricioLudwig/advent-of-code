import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default async (): Promise<void> => {
  const [s1, s2] = getAsArray('13.txt');

  const earliestTimestamp = parseInt(s1, 10);
  const busIds = s2.split(',');

  const earliestDepartures = busIds
    .filter((o) => o !== 'x')
    .map(Number)
    .map((o) => {
      let earliestDeparture = o;

      while (earliestDeparture <= earliestTimestamp) {
        earliestDeparture += o;
      }

      return {
        id: o,
        earliestDeparture,
      };
    });

  const [min] = earliestDepartures.sort(
    (a, b) => a.earliestDeparture - b.earliestDeparture
  );

  success(`Part 1: ${min.id * (min.earliestDeparture - earliestTimestamp)}`);

  const busses = busIds
    .map((o, i) => ({
      id: o,
      index: i,
    }))
    .filter((o) => o.id !== 'x')
    .map((o) => ({
      ...o,
      id: parseInt(o.id, 10),
    }));

  for (let i = busses[0].id; i < 1e10; i += busses[0].id) {
    const valid = busses.every((o) => {
      return (i + o.index) % o.id === 0;
    });

    if (valid) {
      success(`Part 2: ${i}`);
      break;
    }
  }
};
