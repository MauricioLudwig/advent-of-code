import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface IIPAddress {
  sequence: string[];
  hypernet: string[];
}

export default (): void => {
  const ipAddresses = getAsArray('07.txt').map(
    (o): IIPAddress => {
      const match = o.match(/\[(\w+)\]/g);

      if (!match) {
        throw new Error('No match found.');
      }

      const hypernet = match.map((m) => {
        const match = m.match(/\[(\w+)\]/);

        if (!match) {
          throw new Error('No match found.');
        }

        const [, h] = match;

        return h;
      });

      const seqMatch = o.match(/\w+/g);

      if (!seqMatch) {
        throw new Error('No match found.');
      }

      const sequence = seqMatch.filter((f) => !hypernet.some((h) => f === h));

      return {
        sequence,
        hypernet,
      };
    }
  );

  const validTLSAddresses = ipAddresses.reduce((acc, curr) => {
    const seqIsABBA = curr.sequence.some((o) => isABBA(o));
    const hypernetIsABBA = curr.hypernet.some((o) => isABBA(o));

    if (seqIsABBA && !hypernetIsABBA) {
      return acc + 1;
    }

    return acc;
  }, 0);

  success(`Part 1: ${validTLSAddresses}`);
  end();
};

// Autonomous Bridge Bypass Annotation
export const isABBA = (sequence: string): boolean => {
  return sequence.split('').some((_, i, arr) => {
    return (
      arr[i] === arr[i + 3] &&
      arr[i + 1] === arr[i + 2] &&
      arr[i] !== arr[i + 1]
    );
  });
};
