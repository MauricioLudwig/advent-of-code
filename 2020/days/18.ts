import { getAsArray } from '../input';
import { success } from '../utils/logger';

const Patterns = Object.freeze({
  AnyGroup: /\(([0-9*+ ]+)\)/,
  MulGroup: /\(([0-9* ]+)\)/,
  Add: /(\d+) \+ (\d+)/,
  Digit: /\d+/,
  Single: /\((\d+)\)/,
});

export default () => {
  const input = getAsArray('18.txt');

  const sum1 = input
    .map((row) => {
      let expression = row;

      while (true) {
        const [newExpression, valid] = calcGroup(expression);

        if (!valid) {
          break;
        }

        expression = newExpression;
      }

      return expression;
    })
    .reduce((acc, curr) => acc + calcByLeftRule(curr), 0);

  success(`Part 1: ${sum1}`);

  const sum2 = input
    .map((row) => {
      let expression = row;

      while (true) {
        let loops = 0;

        while (true) {
          const [newExpression, valid] = calcAddGroup(expression);

          if (!valid) {
            break;
          }

          loops++;
          expression = newExpression;
        }

        expression = clearSingleGroup(expression);

        while (true) {
          const [newExpression, valid] = calcMulGroup(expression);

          if (!valid) {
            break;
          }

          loops++;
          expression = newExpression;
        }

        if (loops === 0) {
          break;
        }
      }

      return expression;
    })
    .reduce((acc, curr) => acc + calcByLeftRule(curr), 0);

  success(`Part 2: ${sum2}`);
};

const clearSingleGroup = (expression: string): string => {
  while (true) {
    const match = expression.match(Patterns.Single);

    if (!match) {
      break;
    }

    const [s1, s2] = match;
    expression = expression.replace(s1, s2);
  }
  return expression;
};

const calcAddGroup = (expression: string): [string, boolean] => {
  const match = expression.match(Patterns.Add);

  if (!match) {
    return [expression, false];
  }

  const [s1, n1, n2] = match;
  const sum = parseInt(n1, 10) + parseInt(n2, 10);
  expression = expression.replace(s1, `${sum}`);
  return [expression, true];
};

const calcMulGroup = (expression: string): [string, boolean] => {
  const match = expression.match(Patterns.MulGroup);

  if (!match) {
    return [expression, false];
  }

  const [s1, s2] = match;
  const [...numbers] = s2.match(/\d+/g) || [];
  const sum = numbers.reduce((acc, curr) => acc * parseInt(curr, 10), 1);
  expression = expression.replace(s1, `${sum}`);
  return [expression, true];
};

const calcGroup = (expression: string): [string, boolean] => {
  const match = expression.match(Patterns.AnyGroup);

  if (!match) {
    return [expression, false];
  }

  const [s1, s2] = match;
  const sum = calcByLeftRule(s2);
  expression = expression.replace(s1, `${sum}`);
  return [expression, true];
};

const calcByLeftRule = (expression: string): number => {
  let nextOperation = '+';

  return expression.split(' ').reduce((acc, curr) => {
    if (['+', '*'].some((o) => curr === o)) {
      nextOperation = curr;
      return acc;
    }

    if (Patterns.Digit.test(curr)) {
      if (nextOperation === '+') {
        return acc + parseInt(curr, 10);
      } else {
        return acc * parseInt(curr, 10);
      }
    }

    throw new Error('No valid char matched.');
  }, 0);
};
