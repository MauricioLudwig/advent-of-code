// @ts-nocheck
import { getAsArray } from '../input';
import { success } from '../utils/logger';
import { sleep } from '../utils/helper-functions';

export default (): void => {
  const arr: string[] = [];
  let str = '';
  const input2 = getAsArray('04.txt');

  while (input2.length !== 0) {
    const e = input2.shift();

    if (e === '' || e === undefined) {
      arr.push(str);
      str = '';
    } else {
      str += ` ${e}`;
    }

    if (input2.length === 0) {
      arr.push(str);
    }
  }

  const newArr = arr.map((o) => {
    return o
      .trim()
      .split(' ')
      .reduce((acc, curr) => {
        const match = curr.match(/(\w+):(.+)/);
        if (!match) {
          throw new Error();
        }
        const [, key, value] = match;
        return {
          ...acc,
          [key]: value,
        };
      }, {});
  });

  const valid2 = newArr.reduce((acc, curr) => {
    let valid = true;
    const keys = Object.keys(curr);

    if (
      !['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every((o) =>
        keys.includes(o)
      )
    ) {
      valid = false;
      return acc;
    } else {
      // part 1
      // return acc + 1;
    }

    for (let [key, value] of Object.entries(curr)) {
      if (key === 'pid') {
        console.log('pid', value, /\d{9}/.test(value));
        if (!(/\d{9}/.test(value) && value.length === 9)) {
          valid = false;
          break;
        }
      }

      if (key === 'hgt') {
        if (!/(\d+)(cm|in)/.test(value)) {
          valid = false;
          break;
        }

        const [, n5, type] = value.match(/(\d+)(cm|in)/);
        const n5AsNum = parseInt(n5);

        if (type === 'cm') {
          if (!(n5AsNum >= 150 && n5AsNum <= 193)) {
            valid = false;
            break;
          }
        } else if (type === 'in') {
          if (!(n5AsNum >= 59 && n5AsNum <= 76)) {
            valid = false;
            break;
          }
        } else {
          console.log('WONG!');
        }
      }

      if (key === 'byr') {
        const n = parseInt(value);
        if (!(n >= 1920 && n <= 2002)) {
          valid = false;
          break;
        }
      }

      if (key === 'iyr') {
        const n2 = parseInt(value);
        if (!(n2 >= 2010 && n2 <= 2020)) {
          valid = false;
          break;
        }
      }

      if (key === 'eyr') {
        const n3 = parseInt(value);
        if (!(n3 >= 2020 && n3 <= 2030)) {
          valid = false;
          break;
        }
      }

      if (key === 'hcl') {
        if (!/\#[a-f0-9]{6}/.test(value)) {
          valid = false;
          break;
        }
      }

      if (key === 'ecl') {
        if (
          !['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(
            (o) => o === value
          )
        ) {
          valid = false;
          break;
        }
      }
    }

    return valid ? acc + 1 : acc;
  }, 0);

  console.log('part2', valid2);
};
