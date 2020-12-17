import { getAsArray } from '../input';
import { success } from '../utils/logger';
import { Space } from './17.space';

export default async (): Promise<void> => {
  const plane = getAsArray('17.txt').map((o) => o.split(''));

  const space = new Space(plane);

  const cycles = 6;

  for (let i = 0; i < cycles; i++) {
    space.simulateCycle();
  }

  success(`Part 1: ${space.activeCubes}`);
  success(`Part 2:`);
};
