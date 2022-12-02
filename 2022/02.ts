import { TDayFn } from "../@@types";
import { Input, Logger } from "../@@utils";

enum Opponent {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

enum Player {
  Rock = "X",
  Paper = "Y",
  Scissors = "Z",
}

enum Outcome {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

export default async (): TDayFn => {
  const input = new Input("./2022/files/02.txt").asArray;

  const score1 = input.reduce((acc, curr) => {
    const [o, p] = curr.split(" ");
    let score = 0;

    if (o === Opponent.Rock) {
      if (p === Player.Paper) score = 2 + 6;
      else if (p === Player.Rock) score = 1 + 3;
      else if (p === Player.Scissors) score = 3 + 0;
    }
    if (o === Opponent.Paper) {
      if (p === Player.Paper) score = 2 + 3;
      else if (p === Player.Rock) score = 1 + 0;
      else if (p === Player.Scissors) score = 3 + 6;
    }
    if (o === Opponent.Scissors) {
      if (p === Player.Paper) score = 2 + 0;
      else if (p === Player.Rock) score = 1 + 6;
      else if (p === Player.Scissors) score = 3 + 3;
    }

    return acc + score;
  }, 0);

  Logger.success(`Part 1: ${score1}`);

  const score2 = input.reduce((acc, curr) => {
    const [o, p] = curr.split(" ");
    let score = 0;

    if (o === Opponent.Rock) {
      if (p === Outcome.Draw) score = 1 + 3;
      else if (p === Outcome.Win) score = 2 + 6;
      else if (p === Outcome.Lose) score = 3 + 0;
    } else if (o === Opponent.Paper) {
      if (p === Outcome.Draw) score = 2 + 3;
      else if (p === Outcome.Win) score = 3 + 6;
      else if (p === Outcome.Lose) score = 1 + 0;
    } else if (o === Opponent.Scissors) {
      if (p === Outcome.Draw) score = 3 + 3;
      else if (p === Outcome.Win) score = 1 + 6;
      else if (p === Outcome.Lose) score = 2 + 0;
    }

    return acc + score;
  }, 0);

  Logger.success(`Part 2: ${score2}`);
};
