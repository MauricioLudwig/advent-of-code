import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface IGenerationGrowth {
  condition: string;
  product: string;
}

export default (): void => {
  const [line1, , ...input] = getAsArray('12.txt');
  const line1Match = line1.match(/initial state: ([\.|#]+$)/);

  if (!line1Match) {
    throw new Error('No match found.');
  }

  const [, initialState] = line1Match;

  const offsetLeft = 5;
  const offsetRight = 50;
  const numOfGenerations = 1000;

  const pots = initialState.split('');

  for (let i = 0; i < offsetLeft; i++) {
    pots.unshift('.');
  }

  for (let i = 0; i < offsetRight; i++) {
    pots.push('.');
  }

  const generationGrowths = input.map(
    (o): IGenerationGrowth => {
      const [condition, product] = o.split(' => ');
      return { condition, product };
    }
  );

  for (let i = 0; i <= numOfGenerations; i++) {
    const currentGeneration = [...pots];

    if (i === 20) {
      success(`Part 1: ${getPotsSum(pots, offsetLeft)}`);
    }

    for (let y = 0; y < currentGeneration.length; y++) {
      const LL = getPot(currentGeneration, y - 2);
      const L = getPot(currentGeneration, y - 1);
      const C = getPot(currentGeneration, y);
      const R = getPot(currentGeneration, y + 1);
      const RR = getPot(currentGeneration, y + 2);

      const newPot = generationGrowths.find(
        (o) => o.condition === `${LL}${L}${C}${R}${RR}`
      );
      pots[y] = newPot ? newPot.product : '.';
    }
  }

  /*
    Part 2 solution derived from looking at the printout of each generation of plants. For each generation (given an adequately high integer) each subsequent
    generation increases by 5, always.

    Taking the base value from a point in time (generation = 1000) we can immediately calculate the predicted sum after fifty billion (50000000000) generations.
  */
  const sum = (50000000000 - 1000) * 5 + 5219;
  success(`Part 2: ${sum}`);

  end();
};

const getPot = (pots: string[], i: number): string => pots[i] || '.';

const getPotsSum = (pots: string[], offsetLeft: number) => {
  return pots.reduce((acc, curr, index): number => {
    return acc + (curr === '#' ? index - offsetLeft : 0);
  }, 0);
};
