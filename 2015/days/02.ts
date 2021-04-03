import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default async () => {
  const dimensions = getAsArray('02.txt').map((o) => {
    const [l, w, h] = o.split('x').map(Number);
    return {
      l: l!,
      w: w!,
      h: h!,
    };
  });

  const sumArea = dimensions.reduce((acc, curr) => {
    const { l, w, h } = curr;
    const areas = [l * w, l * h, w * h];
    const sumArea = areas.reduce((a, c) => a + c * 2, 0);
    return acc + sumArea + Math.min(...areas);
  }, 0);

  success(`Part 1: ${sumArea}`);

  const sumRibbon = dimensions.reduce((acc, curr) => {
    const { l, w, h } = curr;
    const volume = l * w * h;
    const [n1, n2] = [l, w, h].sort((a, b) => a - b);
    return acc + volume + n1! * 2 + n2! * 2;
  }, 0);

  success(`Part 2: ${sumRibbon}`);
};
