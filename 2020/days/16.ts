import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default async (): Promise<void> => {
  const input = getAsArray('16.txt');

  const yourTicketIndex = input.findIndex((o) => o.includes('your ticket:'));

  const yourTicket = input
    .slice(yourTicketIndex + 1, yourTicketIndex + 2)
    .join('')
    .split(',')
    .map((o) => ({
      checked: false,
      num: parseInt(o, 10),
    }));

  const ticketFields = input.splice(0, yourTicketIndex - 1).map((o) => {
    const [s1, s2] = o.split(':');
    const match = s2.trim().match(/(\d+)-(\d+) or (\d+)-(\d+)/);

    if (!match) {
      throw new Error('No match found.');
    }

    const [, ...nums] = match;
    const [n1, n2, n3, n4] = nums.map(Number);

    return {
      s1,
      from1: n1,
      to1: n2,
      from2: n3,
      to2: n4,
      order: 0,
    };
  });

  const nearbyTicketsIndex = input.findIndex((o) =>
    o.includes('nearby tickets:')
  );

  const nearbyTickets = input.splice(nearbyTicketsIndex + 1).map((o) => ({
    checked: false,
    range: o.split(',').map(Number),
  }));

  const invalidTickets = nearbyTickets.map((nearbyTicket) => {
    return nearbyTicket.range.filter((x) => {
      return !ticketFields.some(
        (o) => (x >= o.from1 && x <= o.to1) || (x >= o.from2 && x <= o.to2)
      );
    });
  });

  const errorRate = invalidTickets.flat().reduce((acc, curr) => acc + curr, 0);

  success(`Part 1: ${errorRate}`);

  while (true) {
    const nextOrder = Math.max(...ticketFields.map((o) => o.order)) + 1;
    let skip = false;

    nearbyTickets.forEach((nearbyTicket, i) => {
      if (skip || nearbyTicket.checked) {
        return;
      }

      ticketFields
        .filter((o) => o.order === 0)
        .forEach((ticketField) => {
          if (skip) {
            return;
          }

          const validTickets = nearbyTicket.range.filter(
            (o) => !invalidTickets[i].includes(o)
          );

          const isValid = validTickets.every((o) => {
            const v1 = o >= ticketField.from1 && o <= ticketField.to1;
            const v2 = o >= ticketField.from2 && o <= ticketField.to2;
            return v1 || v2;
          });

          if (isValid) {
            ticketField.order = nextOrder;
            nearbyTicket.checked = true;
            skip = true;
          }
        });
    });

    if (ticketFields.filter((o) => o.order === 0).length === 0) {
      break;
    }
  }

  let sum = 1;

  ticketFields.forEach((o) => {
    if (o.s1.includes('departure')) {
      yourTicket.forEach((ticket, ticketI) => {
        const v1 = ticket.num >= o.from1 && ticket.num <= o.to1;
        const v2 = ticket.num >= o.from2 && ticket.num <= o.to2;

        if ((v1 || v2) && !ticket.checked && o.order === ticketI + 1) {
          ticket.checked = true;
          sum *= ticket.num;
        }
      });
    }
  });

  console.log(yourTicket);
  console.log(ticketFields);

  success(`Part 2: ${sum}`);
};
