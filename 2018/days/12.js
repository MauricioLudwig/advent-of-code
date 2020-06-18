import chalk from 'chalk';
import { getAsArray } from '../input/index.js';
import { end } from '../utils/logger.js';

export default () => {
  const [line1, , ...input] = getAsArray('12.txt');
  const [, initialState] = line1.match(/initial state: ([\.|#]+$)/);

  const offsetLeft = 2;
  const offsetRight = 50;
  const numOfGenerations = 40;

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

  for (let i = 0; i < numOfGenerations; i++) {
    const currentGeneration = [...pots];
    console.log(chalk.magenta(`Generation: ${i < 10 ? '0' : ''}${i} (${chalk.yellow(getPotsSum(pots, offsetLeft))})`), pots.join(''));

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

  end();
};

const getPot = (pots, i) => pots[i] || '.';

const getPotsSum = (pots, offsetLeft) => pots.reduce((acc, curr, index) => acc + (curr === '#' ? (index - offsetLeft) : 0), 0);