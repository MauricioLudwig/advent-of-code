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

  const occurences = getScratchcardsRecursive(input, 1);
  const sum2 = Object.values(occurences).reduce((acc, curr) => acc + curr, 0);

  Logger.success(`Part 2: ${sum2}`);
};

const getScratchcardsRecursive = (
  cards: Card[],
  id: number,
  occurences: Record<number, number> = {}
): Record<number, number> => {
  const card = cards.find((o) => o.id === id);

  if (!card) {
    return occurences;
  }

  occurences[id] = (occurences[id] ?? 0) + 1;

  Array(card.numOfWinners)
    .fill(0)
    .forEach((_, i) => {
      const nextId = id + i + 1;
      occurences[nextId] = (occurences[nextId] ?? 0) + 1;
      getScratchcardsRecursive(cards, nextId, occurences);
    });

  return occurences;
};
