import { Divisor, getAsMatrix } from '../input';
import { success } from '../utils/logger';

type TRule = {
  i: number;
  subRules: string[][];
};

export default (): void => {
  const [s1, messages] = getAsMatrix('19.txt', Divisor.NewLine);

  const unmappedRules: Array<TRule> = s1
    .map((o) => {
      const [i, s1] = o.split(':');
      const subRules = s1
        .trim()
        .split('|')
        .map((x) =>
          x
            .split(' ')
            .filter((c) => c !== '')
            .map((z) => {
              if (z.includes('a')) {
                return 'a';
              }

              if (z.includes('b')) {
                return 'b';
              }

              return z;
            })
        );
      return {
        i: parseInt(i, 10),
        subRules,
      };
    })
    .sort((a, b) => a.i - b.i);

  const mappedRules = unmappedRules.map((o) => ({
    i: o.i,
    subRules: mapRule(o.i.toString(), unmappedRules) as string[],
  }));

  const validMessagesForRuleZero = messages.reduce((acc, message) => {
    const isValid = mappedRules[0].subRules.some((o) => o === message);
    return acc + (isValid ? 1 : 0);
  }, 0);

  success(`Part 1: ${validMessagesForRuleZero}`);
  success(`Part 2:`);
};

const mapRule = (char: string, allRules: Array<TRule>): string[] | string => {
  if (['a', 'b'].some((o) => o === char)) {
    return char;
  }

  const i = parseInt(char, 10);
  const rule = allRules.find((o) => o.i === i);

  if (!rule) {
    throw new Error('No rule found.');
  }

  return rule.subRules
    .map((subRule) => {
      return subRule.reduce((acc, curr) => {
        const nextChar = mapRule(curr, allRules);

        if (acc.length === 0) {
          if (Array.isArray(nextChar)) {
            return [...nextChar];
          } else {
            return [nextChar];
          }
        }

        return acc
          .map((o) => {
            if (Array.isArray(nextChar)) {
              return nextChar.map((z) => o + z);
            } else {
              return o + nextChar;
            }
          })
          .flat();
      }, [] as Array<string>);
    })
    .flat();
};
