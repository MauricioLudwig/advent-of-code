import chalk from 'chalk';
import { getAsArray } from '../input/index.js';
import { end, success } from '../utils/logger.js';

export default () => {
  const [line1, , ...input] = getAsArray('12.txt');
  const [, initialState] = line1.match(/initial state: ([\.|#]+$)/);

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

  const generationGrowths = input.map(o => {
    const [condition, product] = o.split(' => ');
    return { condition, product };
  });

  for (let i = 0; i <= numOfGenerations; i++) {
    const currentGeneration = [...pots];

    if (i === 20) {
      success(`Part 1: ${getPotsSum(pots, offsetLeft)}`);
    }

    // Uncomment line below to print generation growth over time *
    // console.log((`Generation: ${chalk.blueBright(i)} (${chalk.yellow(getPotsSum(pots, offsetLeft))})`));

    for (let y = 0; y < currentGeneration.length; y++) {
      const LL = getPot(currentGeneration, y - 2);
      const L = getPot(currentGeneration, y - 1);
      const C = getPot(currentGeneration, y);
      const R = getPot(currentGeneration, y + 1);
      const RR = getPot(currentGeneration, y + 2);

      const newPot = generationGrowths.find(o => o.condition === `${LL}${L}${C}${R}${RR}`);
      pots[y] = newPot ? newPot.product : '.';
    }
  }

  /*
    Part 2 solution derived from looking at the printout (*) of each generation of plants. For each generation (given an adequately high integer) each subsequent
    generation increases by 5, always.

    Taking the base value from a point in time (generation = 1000) we can immediately calculate the predicted sum after fifty billion (50000000000) generations.
  */
  const sum = ((50000000000 - 1000) * 5) + 5219;
  success(`Part 2: ${sum}`);

  end();
};

const getPot = (pots, i) => pots[i] || '.';

const getPotsSum = (pots, offsetLeft) => pots.reduce((acc, curr, index) => acc + (curr === '#' ? (index - offsetLeft) : 0), 0);