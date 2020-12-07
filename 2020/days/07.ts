import { getAsArray } from '../input';
import { success } from '../utils/logger';

type Bag = {
  outerBag: string;
  innerBags: Record<string, number> | null;
};

export default () => {
  const input: Array<Bag> = getAsArray('07.txt').map((o) => {
    const [, outerBag] = o.match(/([a-z ]+) bags? contain/) || [];
    const inner = o.split(',');
    if (inner.join('').includes('no other bags')) {
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

  // console.log('input', input);

  const bagColors = new Set<string>();

  const bagsContainingGoldenBag = input.reduce((acc, curr) => {
    if (!curr.innerBags) {
      return acc;
    }

    const hasGoldenBag = containsGoldenBag(curr.outerBag, input);

    if (hasGoldenBag && !curr.outerBag.includes('shiny gold')) {
      bagColors.add(curr.outerBag);
    }

    return (acc += hasGoldenBag ? 1 : 0);
  }, 0);

  // console.log('bagColors', bagColors, bagColors.size);

  success(`Part 1: ${bagsContainingGoldenBag}`);
  success(`Part 2: ${bagAmount('shiny gold', input)}`);
};

type BagAmount = (innerBag: string, input: Array<Bag>) => number;

const bagAmount: BagAmount = (outerBag, input) => {
  const bag = input.find((o) => o.outerBag === outerBag);
  // console.log('bag', bag);

  if (!bag?.innerBags) {
    return 0;
  }

  let sum = 0;

  for (const [name, count] of Object.entries(bag.innerBags)) {
    sum += count + count * bagAmount(name, input);
  }

  return sum;
};

type ContainsShinyGoldBag = (outerBag: string, input: Array<Bag>) => boolean;

const containsGoldenBag: ContainsShinyGoldBag = (outerBag, input) => {
  const bags = input.find((o) => o.outerBag === outerBag);

  if (!bags?.innerBags) {
    return false;
  }

  const { innerBags } = bags;

  if (Object.keys(innerBags).some((o) => o.includes('shiny gold'))) {
    return true;
  }

  return Object.keys(innerBags).some((o) => containsGoldenBag(o, input));
};
