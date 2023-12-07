import { Input, Logger } from "../@@utils";

const HAND_STRENGTH = {
  five: 7,
  four: 6,
  house: 5,
  three: 4,
  two: 3,
  one: 2,
  high: 1,
} as const;

const CARD_STRENGTH: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

type Card = {
  id: number;
  cards: string[];
  cardsStrength: number[];
  bid: number;
  strength?: number;
  rank?: number;
};

export default async () => {
  const cards = new Input("./2023/files/07.txt").asArray
    .map((o, i): Card => {
      const [, c, b] = o.match(/([A-Z0-9]+) (\d+)/) ?? [];
      const cardLs = c!.split("");

      return {
        id: i + 1,
        cards: cardLs,
        cardsStrength: getCardStrength(cardLs),
        bid: parseInt(b!, 10),
        strength: getHandStrength(cardLs),
      };
    })
    .sort((a, b) => (b.strength ?? 0) - (a.strength ?? 0));

  assignRanks(cards);

  const sum1 = cards.reduce(
    (acc, curr) => acc + curr.bid * (curr.rank ?? 0),
    0
  );

  Logger.success(`Part 1: ${sum1}`);
};

const assignRanks = (cards: Card[]): void => {
  let nextRank = cards.length;

  for (let i = 0; i < cards.length; ) {
    const card = cards[i]!;
    const subLs = cards.slice(i + 1);
    const sameStrengthCards = [
      ...subLs.filter((o) => o.strength === card.strength),
      card,
    ];

    if (sameStrengthCards.length === 1) {
      card.rank = nextRank--;
      i++;
    } else {
      while (true) {
        const unrankedCards = sameStrengthCards.filter(
          (o) => o.rank === undefined
        );

        if (unrankedCards.length === 0) {
          break;
        }

        let nextCardIndex = 0;
        let filteredCards = [...unrankedCards];

        while (true) {
          const maxCardStrength = Math.max(
            ...filteredCards.flatMap((o) => o.cardsStrength[nextCardIndex]!)
          );

          filteredCards = filteredCards.filter(
            (o) => o.cardsStrength[nextCardIndex] === maxCardStrength
          );

          if (filteredCards.length === 1) {
            filteredCards[0]!.rank = nextRank--;
            i++;
            break;
          } else {
            nextCardIndex++;
          }
        }
      }
    }
  }
};

const getCardStrength = (cards: string[]): number[] =>
  cards.map((o) => CARD_STRENGTH?.[o] ?? parseInt(o, 10));

const getHandStrength = (cards: string[]): number => {
  const uniqueCards = new Set(cards);
  const occurrences = getOccurrences(cards);
  const maxOccurence = Math.max(...Object.values(occurrences));

  switch (uniqueCards.size) {
    case 1:
      return HAND_STRENGTH.five;
    case 2:
      return maxOccurence === 4 ? HAND_STRENGTH.four : HAND_STRENGTH.house;
    case 3:
      return maxOccurence === 3 ? HAND_STRENGTH.three : HAND_STRENGTH.two;
    case 4:
      return HAND_STRENGTH.one;
    case 5:
      return HAND_STRENGTH.high;
    default:
      throw new Error(`${uniqueCards.size} did not match any cases`);
  }
};

const getOccurrences = (cards: string[]): Record<string, number> =>
  cards.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: (acc[curr] ?? 0) + 1,
    }),
    {} as Record<string, number>
  );
