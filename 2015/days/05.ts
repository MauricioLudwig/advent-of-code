import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default async () => {
  const strings = getAsArray('05.txt');

  (() => {
    const niceStrings = strings.reduce((acc, curr) => {
      const isNice =
        StringValidator.containsAtleastThreeVowels(curr) &&
        StringValidator.containsRepeatLetter(curr) &&
        StringValidator.doesNotContainBlacklist(curr);
      return acc + (isNice ? 1 : 0);
    }, 0);

    success(`Part 1: ${niceStrings}`);
  })();

  (() => {
    const niceStrings = strings.reduce((acc, curr) => {
      const isNice =
        StringValidator.containsPairOfTwoLetters(curr) &&
        StringValidator.repeatsWithArbitraryLetterBetween(curr);
      return acc + (isNice ? 1 : 0);
    }, 0);

    success(`Part 2: ${niceStrings}`);
  })();
};

class StringValidator {
  static containsAtleastThreeVowels(str: string): boolean {
    return str.split('').filter((o) => 'aeiou'.includes(o)).length >= 3;
  }

  static containsRepeatLetter(str: string): boolean {
    return str.split('').some((o, i) => o === str[i + 1]);
  }

  static doesNotContainBlacklist(str: string): boolean {
    return ['ab', 'cd', 'pq', 'xy'].every((o) => !str.includes(o));
  }

  static containsPairOfTwoLetters(str: string): boolean {
    return str.split('').some((o, i) => {
      const pair = `${o}${str[i + 1]}`;
      const occurrences = str.match(new RegExp(pair, 'gi'))?.length;
      const overlap = o === str[i + 1] && o === str[i + 2];
      return typeof occurrences === 'number' && occurrences > 1 && !overlap;
    });
  }

  static repeatsWithArbitraryLetterBetween(str: string): boolean {
    return str.split('').some((o, i) => o === str[i + 2]);
  }
}
