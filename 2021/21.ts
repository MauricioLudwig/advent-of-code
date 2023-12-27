import { Logger } from "../@@utils";

type Player = {
  space: number;
  score: number;
};

export default async () => {
  const players = getPlayers([7, 5]);
  let turn = 0;
  let dice = 0;

  while (players.every((o) => o.score < 1000)) {
    const player = players[turn]!;

    [...Array(3)].forEach((_) => {
      dice++;
      player.space += dice;
    });

    player.space %= 10;
    player.score += player.space + 1;

    turn = (turn + 1) % players.length;
  }

  const minScore = Math.min(...players.map((o) => o.score));

  Logger.success(`Part 1: ${minScore * dice}`);
};

const getPlayers = (startingPositions: number[]): Player[] =>
  startingPositions.map((o) => ({
    space: o - 1,
    score: 0,
  }));
