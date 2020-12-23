export type TPlayer = {
  cards: number[];
};

export type TRounds = {
  cards: string[];
};

class Combat {
  players: Array<TPlayer> = [];

  constructor(players: Array<TPlayer>) {
    this.players = Array.from(players).map((o) => ({
      cards: Array.from(o.cards),
    }));
  }

  protected stopPlaying(players: Array<TPlayer>): boolean {
    return players.some((p) => p.cards.length === 0);
  }

  get winningScore(): number {
    return (
      this.players
        .find((p) => p.cards.length !== 0)
        ?.cards.reverse()
        .reduce((acc, curr, i) => (acc += curr * (i + 1)), 0) || 0
    );
  }
}

export class CrabCombat extends Combat {
  constructor(players: Array<TPlayer>) {
    super(players);
  }

  play(): void {
    while (true) {
      const [p1, p2] = this.players;

      const p1Card = p1.cards.shift() as number;
      const p2Card = p2.cards.shift() as number;

      if (p1Card > p2Card) {
        p1.cards.push(p1Card, p2Card);
      } else {
        p2.cards.push(p2Card, p1Card);
      }

      if (this.stopPlaying(this.players)) {
        break;
      }
    }
  }
}

export class RecursiveCombat extends Combat {
  constructor(players: Array<TPlayer>) {
    super(players);
  }

  play(): void {
    this.recursiveGame(this.players);
  }

  private recursiveGame(players: Array<TPlayer>): number {
    const history: Array<TRounds> = players.map(() => ({
      cards: [],
    }));

    while (true) {
      if (this.isRepeating(history, players)) {
        return 0;
      }

      const [h1, h2] = history;
      h1.cards.push(players[0].cards.join(','));
      h2.cards.push(players[1].cards.join(','));

      const [p1, p2] = players;
      const p1Card = p1.cards.shift() as number;
      const p2Card = p2.cards.shift() as number;

      if (p1.cards.length >= p1Card && p2.cards.length >= p2Card) {
        const newDecks = [
          {
            cards: [...p1.cards].slice(0, p1Card),
          },
          {
            cards: [...p2.cards].slice(0, p2Card),
          },
        ];

        const winningPlayer = this.recursiveGame(newDecks);

        if (winningPlayer === 0) {
          p1.cards.push(p1Card, p2Card);
        } else {
          p2.cards.push(p2Card, p1Card);
        }
      } else {
        if (p1Card > p2Card) {
          p1.cards.push(p1Card, p2Card);
        } else {
          p2.cards.push(p2Card, p1Card);
        }
      }

      if (this.stopPlaying(players)) {
        return players.findIndex((o) => o.cards.length !== 0);
      }
    }
  }

  private isRepeating(
    history: Array<TRounds>,
    players: Array<TPlayer>
  ): boolean {
    return history.every((h, i) =>
      h.cards.some((o) => o === players[i].cards.join(','))
    );
  }
}
