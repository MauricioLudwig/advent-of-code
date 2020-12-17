import { getAsMatrix, Divisor } from '../input';
import { success } from '../utils/logger';

export default async (): Promise<void> => {
  const [s1, [, s2], [, ...s3]] = getAsMatrix('16.txt', Divisor.NewLine);

  const ticketFields = s1.map((o) => {
    const [field, range] = o.split(':');
    const match = range.trim().match(/(\d+)-(\d+) or (\d+)-(\d+)/) || [];
    const [, ...numbers] = match;
    const [from1, to1, from2, to2] = numbers.map(Number);
    return {
      field,
      from1,
      to1,
      from2,
      to2,
    };
  });

  const yourTicket = s2.split(',').map(Number);
  console.log('yourTicket', yourTicket);

  const nearbyTickets = s3.map((o) => o.split(',').map(Number));

  const invalidTickets = nearbyTickets.flat().filter((nearbyTicket) => {
    return !ticketFields.some(({ from1, to1, from2, to2 }) => {
      const v1 = nearbyTicket >= from1 && nearbyTicket <= to1;
      const v2 = nearbyTicket >= from2 && nearbyTicket <= to2;
      return v1 || v2;
    });
  });

  const errorRate = invalidTickets.reduce((acc, curr) => acc + curr, 0);

  success(`Part 1: ${errorRate}`);
  success(`Part 2:`);
};
