import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default () => {
  const input = getAsArray('18.txt');

  const expressions = input.map((row) => {
    let expression = row;

    while (true) {
      const match = expression.match(/\(([0-9*+ ]+)\)/);

      if (!match) {
        break;
      }

      const [s1, s2] = match;
      const subSum = calculateExpression(s2);
      expression = expression.replace(s1, `${subSum}`);
    }

    return expression;
  });

  const sum = expressions.reduce(
    (acc, curr) => acc + calculateExpression(curr),
    0
  );

  success(`Part 1: ${sum}`);
  success(`Part 2:`);
};

const calculateExpression = (expression: string): number => {
  let nextOperation = '+';

  const sum = expression.split(' ').reduce((acc, curr) => {
    if (['+', '*'].some((o) => curr === o)) {
      nextOperation = curr;
      return acc;
    }

    if (/\d+/.test(curr)) {
      if (nextOperation === '+') {
        return acc + parseInt(curr, 10);
      } else {
        return acc * parseInt(curr, 10);
      }
    }

    throw new Error('No valid char matched.');
  }, 0);

  return sum;
};
