import { success, end } from '../utils/logger';

interface Players {
  [key: string]: number;
}

export default (): void => {
  const playerCount = 426;
  const lastMarblePoint = 72058;

  const players: Players = new Array(playerCount)
    .fill(0)
    .reduce((acc, curr, i): Players => {
      return {
        ...acc,
        [i + 1]: curr,
      };
    }, {});

  let currentPlayer = 1;

  let marbles = [0];
  let currentMarbleIndex = 0;

  for (let i = 0; i < lastMarblePoint; i++) {
    const marble = i + 1;

    if (marble % 23 === 0) {
      const [removedMarble] = marbles.splice(currentMarbleIndex - 7, 1);
      players[currentPlayer] += removedMarble + marble;
      currentMarbleIndex -= 7;

      if (currentMarbleIndex < 0) {
        currentMarbleIndex = marbles.length - Math.abs(currentMarbleIndex) + 1;
      }
    } else {
      const index = (currentMarbleIndex + 1) % marbles.length;
      marbles.splice(index + 1, 0, marble);
      currentMarbleIndex = index + 1;
    }

    if (++currentPlayer > playerCount) {
      currentPlayer = 1;
    }
  }

  const [highScore] = Object.values(players).sort((a, b) => b - a);
  success(`Part 1: ${highScore}`);

  end();
};
