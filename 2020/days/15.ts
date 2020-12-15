import { getAsSingleLine } from '../input';
import { success } from '../utils/logger';

export default async (): Promise<void> => {
  const spokenNumbers = getAsSingleLine('15.txt').split(',').map(Number);
  let lastSpokenNumber = spokenNumbers[spokenNumbers.length - 1];
  const initLen = spokenNumbers.length;

  for (let i = 1; i <= 2020 - initLen; i++) {
    if (
      spokenNumbers.findIndex(
        (o, fi) => o === lastSpokenNumber && fi > initLen - 1
      ) === -1
    ) {
      spokenNumbers.push(0);
      lastSpokenNumber = 0;
    } else if (
      spokenNumbers.filter((o) => o === lastSpokenNumber).length === 1
    ) {
      spokenNumbers.push(0);
      lastSpokenNumber = 0;
    } else {
      const x = [...spokenNumbers].reverse();
      const n1 = x.findIndex((o) => o === lastSpokenNumber);
      const n2 = x.findIndex((o, i) => o === lastSpokenNumber && i !== n1);
      spokenNumbers.push(n2 - n1);
      lastSpokenNumber = n2 - n1;
    }
  }

  console.log(spokenNumbers[spokenNumbers.length - 1], spokenNumbers.length);

  success(`Part 1`);
  success(`Part 2`);
};
