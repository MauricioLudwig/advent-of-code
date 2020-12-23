import { getAsMatrix, Divisor } from '../input';
import { success } from '../utils/logger';
import { CrabCombat, RecursiveCombat, TPlayer } from './22.combat';

export default (): void => {
  const players: Array<TPlayer> = getAsMatrix('22.txt', Divisor.NewLine).map(
    ([, ...cards]) => ({
      cards: cards.map(Number),
    })
  );

  const crabCombat = new CrabCombat(players);
  crabCombat.play();
  success(`Part 1: ${crabCombat.winningScore}`);

  const recursiveCombat = new RecursiveCombat(players);
  recursiveCombat.play();
  success(`Part 2: ${recursiveCombat.winningScore}`);
};
