import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

export default (): void => {
  const ranges = getAsArray('20.txt').map((o) => {
    const [, low, high] = (o.match(/(\d+)-(\d+)/) || []).map(Number);
    return { low, high };
  });

  let index = 0;

  while (true) {
    const range = ranges.find((r) => index >= r.low && index <= r.high);

    if (!range) {
      break;
    } else {
      index = range.high + 1;
    }
  }

  success(`Part 1: ${index}`);

  let validIPs = 0;
  let currentIP = 0;

  while (currentIP <= 4294967295) {
    const range = ranges.find((r) => currentIP >= r.low && currentIP <= r.high);

    if (!range) {
      validIPs++;
      currentIP++;
    } else {
      currentIP = range.high + 1;
    }
  }

  success(`Part 2: ${validIPs}`);

  end();
};
