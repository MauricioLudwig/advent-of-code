import { getAsArray } from '../input';
import { generateBitPermutation } from '../utils/array-methods';
import { success } from '../utils/logger';

type TOperation = {
  memory: number;
  value: number;
};

type TMask = {
  mask: Array<string>;
  operations: Array<TOperation>;
};

export default async (): Promise<void> => {
  const input = getAsArray('14.txt');
  const inputAsMatrix: string[][] = [];

  while (input.length > 0) {
    const nextIndex = input.findIndex((o, i) => i !== 0 && o.includes('mask'));

    if (nextIndex === -1) {
      inputAsMatrix.push(input.splice(0));
    } else {
      inputAsMatrix.push(input.splice(0, nextIndex));
    }
  }

  const masks: Array<TMask> = inputAsMatrix.map((o) => {
    const [s1, ...mems] = o;

    const s1Match = s1.match(/mask = ([X01]+)/);

    if (!s1Match) {
      throw new Error('No match found.');
    }

    const [, mask] = s1Match;

    const operations = mems.map((mem) => {
      const match = mem.match(/mem\[(\d+)\] = (\d+)/);

      if (!match) {
        throw new Error('No match found.');
      }

      const [, memory, value] = match;
      return {
        memory: parseInt(memory, 10),
        value: parseInt(value, 10),
      };
    });

    return {
      mask: mask.split(''),
      operations,
    };
  });

  const memoryBank = masks.reduce((acc, curr) => {
    const subMemoryBank: Record<string, number> = {};

    curr.operations.forEach((operation) => {
      const value = generateBitValue(operation.value);
      const result = perfMasking(value, curr.mask);
      subMemoryBank[operation.memory] = parseInt(result, 2);
    });

    return { ...acc, ...subMemoryBank };
  }, {} as Record<string, number>);

  success(`Part 1: ${getSum(memoryBank)}`);

  const addressBank = masks.reduce((acc, curr) => {
    const subAddressBank: Record<string, number> = {};

    curr.operations.forEach((operation) => {
      const addressValue = generateBitValue(operation.memory);
      const result = perfMasking(addressValue, curr.mask, true);
      const numXs = result.split('').filter((o) => o === 'X').length;
      const permutations = generateBitPermutation(numXs);
      replaceWithBits(result, permutations).forEach((perm) => {
        subAddressBank[parseInt(perm, 2)] = operation.value;
      });
    });

    return { ...acc, ...subAddressBank };
  }, {} as Record<string, number>);

  success(`Part 2: ${getSum(addressBank)}`);
};

const generateBitValue = (decimal: number): string[] => {
  const bits = decimal.toString(2);
  const leadingZeros = Array(36 - bits.length).fill(0);
  return [...leadingZeros, ...bits.split('')].map(String);
};

const perfMasking = (
  value: string[],
  mask: string[],
  isVersion2 = false
): string => {
  let result: string[] = [];

  for (let i = 0; i < mask.length; i++) {
    if (isVersion2) {
      if (mask[i] === '0') {
        result.push(value[i]);
      } else {
        result.push(mask[i]);
      }
    } else {
      if (mask[i] === 'X') {
        result.push(value[i]);
      } else {
        result.push(mask[i]);
      }
    }
  }

  return result.join('');
};

const replaceWithBits = (
  bitMask: string,
  permutations: number[][]
): string[] => {
  const bitMaskLs: string[] = [];
  permutations.map((o) => {
    let mask = bitMask;

    for (let i = 0; i < o.length; i++) {
      mask = mask.replace('X', o[i].toString());
    }

    bitMaskLs.push(mask);
  });

  return bitMaskLs;
};

const getSum = (bank: Record<string, number>): number =>
  Object.values(bank).reduce((acc, curr) => acc + curr, 0);
