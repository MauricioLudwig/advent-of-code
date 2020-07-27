import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

enum Char {
  groupOpen = '{',
  groupClose = '}',
  garbageOpen = '<',
  garbageClose = '>',
  cancel = '!',
}

export default (): void => {
  const input = getAsSingleLine('09.txt').split('');

  let groups = 0;
  let score = 0;
  let garbage = false;
  let amountOfGarbage = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    switch (char) {
      case Char.groupOpen:
        if (!garbage) {
          groups++;
        } else {
          amountOfGarbage++;
        }
        break;
      case Char.groupClose:
        if (!garbage) {
          score += groups;
          groups--;
        } else {
          amountOfGarbage++;
        }
        break;
      case Char.garbageOpen:
        if (garbage) {
          amountOfGarbage++;
        } else {
          garbage = true;
        }
        break;
      case Char.garbageClose:
        garbage = false;
        break;
      case Char.cancel:
        i++;
        break;
      default:
        if (garbage) {
          amountOfGarbage++;
        }
        break;
    }
  }

  success(`Part 1: ${score}`);
  success(`Part 2: ${amountOfGarbage}`);

  end();
};
