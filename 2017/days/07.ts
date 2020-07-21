import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

export default () => {
  const input = getAsArray('07.txt').map((o) => {
    const [left, right] = o.split('->');
    const [, origin, number] = left.match(/(\w+) \((\d+)\)/) ?? [];
    const next = right?.split(',').map((o) => o.trim()) ?? null;

    return {
      origin,
      number,
      next,
    };
  });

  const originCollection = input.map((o) => o.origin);

  const nextCollection = input
    .filter((o) => o.next)
    .map((o) => o.next)
    .flat();

  const [origin] = originCollection.filter(
    (o) => !nextCollection.some((x) => o === x)
  );

  success(`Part 1: ${origin}`);

  end();
};
