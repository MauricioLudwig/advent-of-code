import { getAsSingleLine } from '../input/index.js';
import { success, end } from '../utils/logger.js';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export default () => {
  const input = getAsSingleLine('05.txt');
  const polarityPattern = new RegExp(getPolarityPattern(), 'g');

  // Part 1
  const shortestPolymer = calculateShortestPolymer(input, polarityPattern);
  success(`Part 1: ${shortestPolymer.length}`);

  // Part 2
  let minPolymer = Infinity;

  Array.from(alphabet).forEach(letter => {
    const pattern = new RegExp(`(${letter}|${letter.toUpperCase()})`, 'g');
    const str = input.replace(pattern, '');
    const polymer = calculateShortestPolymer(str, polarityPattern);

    if (polymer.length < minPolymer) {
      minPolymer = polymer.length;
    }
  });

  success(`Part 2: ${minPolymer}`);
  end();
};

const getPolarityPattern = () => {
  let pattern = '(';
  pattern += Array.from(alphabet).map(o => `${o.toUpperCase()}${o}|${o}${o.toUpperCase()}`).join('|');
  pattern += ')';
  return pattern;
};

const calculateShortestPolymer = (input, pattern) => {
  let polymer = input;

  while (true) {
    const prevLen = polymer.length;
    polymer = polymer.replace(pattern, '');

    if (polymer.length === prevLen) {
      break;
    }
  }

  return polymer;
};
