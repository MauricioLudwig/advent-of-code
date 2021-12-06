import { TDayFn } from '../@@types';
import { Input, Logger } from '../@@utils';

export default async (): TDayFn => {
  const input = new Input('./2021/files/06.txt').asSingleLine
    .split(',')
    .map(Number);
  console.log('input', input);
  const numberOfDays = 80;

  for (let i = 0; i < numberOfDays; i++) {
    let newFish = 0;

    for (let y = 0; y < input.length; y++) {
      const fish = input[y];

      if (fish === 0) {
        input[y] = 6;
        newFish++;
      } else {
        input[y]--;
      }
    }

    for (let z = 0; z < newFish; z++) {
      input.push(8);
    }
  }

  console.log('input', input.length);
};
