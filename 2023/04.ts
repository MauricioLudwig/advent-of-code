import { Input, Logger } from "../@@utils";

type Card = {
  id: number;
  winners: number[];
  numbers: number[];
  sum1: number;
  numOfWinners: number;
};

export default async () => {
  const input = new Input("./2023/files/04.txt").asArray.map((o): Card => {
    const [card, nums] = o.split(":");
    const [id] = card!.match(/(\d+)/) ?? [];
    const [nums1, nums2] = nums!.split("|") ?? [];
    const winners = nums1!.match(/(\d+)/g)!.map(Number);
    const numbers = nums2!.match(/(\d+)/g)!.map(Number);
    const numOfWinners = winners.reduce((acc, curr) => {
      if (numbers.includes(curr)) {
        return acc === 0 ? 1 : acc * 2;
      }

      return acc;
    }, 0);

    return {
      id: parseInt(id!, 10),
      winners,
      numbers,
      sum1: numOfWinners,
      numOfWinners: winners.filter((o) => numbers.includes(o)).length,
    };
  });

  const sum1 = input.reduce((acc, curr) => acc + curr.sum1, 0);
  Logger.success(`Part 1: ${sum1}`);

  const dictionary = input.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.id]: {
        copies: 1,
        iterations: 1,
      },
    }),
    {} as Record<
      number,
      {
        copies: number;
        iterations: number;
      }
    >
  );

  for (let card of input) {
    [...Array(card.numOfWinners)].forEach((_, i) => {
      const nextId = card.id + i + 1;
      const nextCard = dictionary[nextId]!;
      const currentCard = dictionary[card.id]!;
      nextCard.iterations += 1 * currentCard.iterations;
      currentCard.copies += currentCard.iterations;
    });
  }

  const sum2 = Object.values(dictionary).reduce(
    (acc, curr) => acc + curr.copies,
    0
  );

  Logger.success(`Part 2: ${sum2}`);
};
