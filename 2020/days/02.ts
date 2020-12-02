import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const passwordList = getAsArray('02.txt').map((o) => {
    const match = o.match(/(\d+)-(\d+) (\w{1}): (\w+)/);

    if (!match) {
      throw new Error('No match was found.');
    }

    const [, n1, n2, letter, password] = match;

    return {
      n1: parseInt(n1, 10),
      n2: parseInt(n2, 10),
      letter,
      password,
    };
  });

  (() => {
    const validPasswords = passwordList.reduce((acc, curr) => {
      const { n1, n2, letter, password } = curr;
      const occurrences = password.split('').filter((o) => o === letter).length;
      return n1 <= occurrences && occurrences <= n2 ? acc + 1 : acc;
    }, 0);
    success(`Part 1: ${validPasswords}`);
  })();

  (() => {
    const validPasswords = passwordList.reduce((acc, curr) => {
      const { n1, n2, letter, password } = curr;

      let count = 0;

      if (password[n1 - 1] === letter) {
        count++;
      }

      if (password[n2 - 1] === letter) {
        count++;
      }

      return count === 1 ? acc + 1 : acc;
    }, 0);
    success(`Part 2: ${validPasswords}`);
  })();
};
