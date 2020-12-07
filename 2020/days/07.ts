import { getAsArray } from '../input';
import { success } from '../utils/logger';

type Bag = {
  outerBag: string;
  innerBags: Record<string, number> | null;
};

const SHINY_GOLD = 'shiny gold';

export default () => {
  const input: Array<Bag> = getAsArray('07.txt').map((o) => {
    const [, outerBag] = o.match(/([a-z ]+) bags? contain/) || [];

    if (o.split(',').join('').includes('no other bags')) {
      return {
        outerBag,
        innerBags: null,
      };
    }

    const innerBags = o.split(',').reduce((acc, curr) => {
      const [, amount, content] = curr.match(/(\d+) ([a-z ]+) bags?/) || [];
      return {
        ...acc,
        [content]: parseInt(amount, 10),
      };
    }, {} as Record<string, number>);

    return { outerBag, innerBags };
  });

  const bagsContainingGoldenBag = input.reduce((acc, curr) => {
    const hasGoldenBag = containsGoldenBag(curr.outerBag, input);
    const isGoldenBag = curr.outerBag.includes(SHINY_GOLD);
    return (acc += hasGoldenBag && !isGoldenBag ? 1 : 0);
  }, 0);

  success(`Part 1: ${bagsContainingGoldenBag}`);
  success(`Part 2: ${calcBagAmount(SHINY_GOLD, input)}`);
};

type CalcBagAmount = (innerBag: string, input: Array<Bag>) => number;

const calcBagAmount: CalcBagAmount = (outerBag, input) => {
  const bag = input.find((o) => o.outerBag === outerBag);

  if (!bag?.innerBags) {
    return 0;
  }

  let sum = 0;

  for (const [name, count] of Object.entries(bag.innerBags)) {
    sum += count + count * calcBagAmount(name, input);
  }

  return sum;
};

type ContainsGoldenBag = (outerBag: string, input: Array<Bag>) => boolean;

const containsGoldenBag: ContainsGoldenBag = (outerBag, input) => {
  const bag = input.find((o) => o.outerBag === outerBag);

  if (!bag?.innerBags) {
    return false;
  }

  const { innerBags } = bag;

  if (Object.keys(innerBags).some((o) => o.includes(SHINY_GOLD))) {
    return true;
  }

  return Object.keys(innerBags).some((o) => containsGoldenBag(o, input));
};
