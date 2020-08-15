import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export default (): void => {
  const input = getAsSingleLine('05.txt');
  const polarityPattern = new RegExp(getPolarityPattern(), 'g');

  const shortestPolymer = calculateShortestPolymer(input, polarityPattern);
  success(`Part 1: ${shortestPolymer.length}`);

  let minPolymer = Infinity;

  Array.from(alphabet).forEach((letter): void => {
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

const getPolarityPattern = (): string => {
  let pattern = '(';
  pattern += Array.from(alphabet)
    .map((o): string => `${o.toUpperCase()}${o}|${o}${o.toUpperCase()}`)
    .join('|');
  pattern += ')';
  return pattern;
};

const calculateShortestPolymer = (input: string, pattern: RegExp): string => {
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
