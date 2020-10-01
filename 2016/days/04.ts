import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface IRoom {
  encryptedName: string[];
  decryptedName: string[];
  sectorId: number;
  checkSum: string;
}

interface ILetterGroup {
  letter: string;
  count: number;
}

interface ICombination {
  [key: string]: ILetterGroup;
}

export default (): void => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const specialChars = ['-', ' '];

  const rooms: IRoom[] = getAsArray('04.txt').map((o) => {
    const match = o.match(/([a-zA-Z-]+)(\d+)\[(\w+)\]/);

    if (!match) {
      throw new Error('No match found.');
    }

    const [, s1, sectorId, checkSum] = match;

    return {
      encryptedName: s1.split(''),
      decryptedName: [],
      sectorId: parseInt(sectorId, 10),
      checkSum,
    };
  });

  const sum = rooms.reduce((acc, curr) => {
    const nameCombination = getCombination(curr.encryptedName)
      .slice(0, 5)
      .map((o) => o.letter)
      .join('');

    if (nameCombination === curr.checkSum) {
      return acc + curr.sectorId;
    }

    return acc;
  }, 0);

  success(`Part 1: ${sum}`);

  rooms.forEach((o) => {
    o.decryptedName = o.encryptedName.map((c) => {
      if (alphabet.includes(c)) {
        const i = alphabet.indexOf(c) + o.sectorId;
        return alphabet[i % alphabet.length] ?? '';
      } else {
        const i = specialChars.indexOf(c) + o.sectorId;
        return specialChars[i % specialChars.length] ?? '';
      }
    });

    if (o.decryptedName.join('').includes('north')) {
      success(`Part 2: ${o.sectorId}`);
    }
  });

  end();
};

const getCombination = (name: string[]): ILetterGroup[] => {
  const combination = name
    .filter((o) => o !== '-')
    .reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr].count++;
      } else {
        acc[curr] = {
          letter: curr,
          count: 1,
        };
      }

      return acc;
    }, {} as ICombination);

  const letterGrouping = Object.values(combination).sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    } else if (b.count > a.count) {
      return 1;
    }

    if (a.letter > b.letter) {
      return 1;
    } else if (b.letter > a.letter) {
      return -1;
    } else {
      return 0;
    }
  });

  return letterGrouping;
};
