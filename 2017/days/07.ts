import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface Input {
  origin: string;
  number: number;
  next: string[];
}

export default (): void => {
  const input = getAsArray('07.txt').map(
    (o): Input => {
      const [left, right] = o.split('->');
      const [, origin, number] = left.match(/(\w+) \((\d+)\)/) ?? [];
      const next = right?.split(',').map((o): string => o.trim()) ?? [];

      return {
        origin,
        number: parseInt(number, 10),
        next,
      };
    }
  );

  const originCollection = input.map((o): string => o.origin);

  const nextCollection = input
    .map((o): string[] => o.next)
    .filter((o): boolean => o.length > 0)
    .flat();

  const [origin] = originCollection.filter(
    (o): boolean => !nextCollection.some((x): boolean => o === x)
  );

  success(`Part 1: ${origin}`);

  end();
};
