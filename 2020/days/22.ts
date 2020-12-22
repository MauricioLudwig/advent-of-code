import { getAsMatrix, Divisor } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const [p1, p2] = getAsMatrix('22.txt', Divisor.NewLine).map((o, i) => {
    const [, ...cards] = o;
    return {
      player: i + 1,
      cards: cards.map(Number),
    };
  });

  while (true) {
    const p1Card = p1.cards.shift() as number;
    const p2Card = p2.cards.shift() as number;

    if (p1Card > p2Card) {
      p1.cards.push(p1Card, p2Card);
    } else {
      p2.cards.push(p2Card, p1Card);
    }

    if (p1.cards.length === 0 || p2.cards.length === 0) {
      break;
    }
  }

  const score = [p1, p2]
    .find((o) => o.cards.length !== 0)
    ?.cards.reverse()
    .reduce((acc, curr, i) => {
      return (acc += curr * (i + 1));
    }, 0);

  success(`Part 1: ${score}`);
  success(`Part 2:`);
};
