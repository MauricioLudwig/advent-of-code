import { getAsMatrix } from '../input';
import { success } from '../utils/logger';

const REQUIRED_FIELDS: ReadonlyArray<string> = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
];

export default (): void => {
  const passwords = getAsMatrix('04.txt', '').map((group) =>
    group
      .join(' ')
      .trim()
      .split(' ')
      .reduce((acc, curr) => {
        const match = curr.match(/^(\w+):(.+)$/);

        if (!match) {
          throw new Error('No match found.');
        }

        const [, key, value] = match;

        return {
          ...acc,
          [key]: value,
        };
      }, {} as Record<string, string>)
  );

  (() => {
    const validPasswords = passwords.reduce((acc, curr) => {
      const keys = Object.keys(curr);
      const valid = REQUIRED_FIELDS.every((o) => keys.includes(o));
      return valid ? acc + 1 : acc;
    }, 0);

    success(`Part 1: ${validPasswords}`);
  })();

  (() => {
    const validPasswords = passwords.reduce((acc, curr) => {
      const keys = Object.keys(curr);
      const containsRequiredFields = REQUIRED_FIELDS.every((o) =>
        keys.includes(o)
      );

      let validField = true;

      for (const [key, value] of Object.entries(curr)) {
        switch (key) {
          case 'byr':
            validField = checkRange(value, 1920, 2002);
            break;
          case 'iyr':
            validField = checkRange(value, 2010, 2020);
            break;
          case 'eyr':
            validField = checkRange(value, 2020, 2030);
            break;
          case 'hgt':
            if (!/(\d+)(cm|in)/.test(value)) {
              validField = false;
              break;
            }
            const [, height, metric] = value.match(/(\d+)(cm|in)/) || [];
            validField =
              metric === 'cm'
                ? checkRange(height, 150, 193)
                : checkRange(height, 59, 76);
            break;
          case 'hcl':
            validField = /\#[a-f0-9]{6}/.test(value);
            break;
          case 'ecl':
            validField = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(
              (o) => value === o
            );
            break;
          case 'pid':
            validField = /^\d{9}$/.test(value);
            break;
        }

        if (!validField) {
          break;
        }
      }

      return containsRequiredFields && validField ? acc + 1 : acc;
    }, 0);

    success(`Part 2: ${validPasswords}`);
  })();
};

const checkRange = (value: string, min: number, max: number): boolean => {
  const num = parseInt(value, 10);
  return num >= min && num <= max;
};
