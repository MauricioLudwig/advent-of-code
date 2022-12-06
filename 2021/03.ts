import { Input, Logger } from '../@@utils';

export default async () => {
  const input = new Input('./2021/files/03.txt').asArray;
  const bitLen = input[0]!.length;

  const mostCommon: string[] = [];

  (() => {
    for (let y = 0; y < bitLen; y++) {
      let sum = 0;

      for (let i = 0; i < input.length; i++) {
        sum += input[i]![y] === '1' ? 1 : -1;
      }

      if (sum > 0) {
        mostCommon.push('1');
      } else {
        mostCommon.push('0');
      }
    }

    const leastCommon = mostCommon.map((o) => (o === '1' ? '0' : '1'));

    const sum =
      binaryToDecimal(mostCommon.join('')) *
      binaryToDecimal(leastCommon.join(''));

    Logger.success(`Part 1: ${sum}`);
  })();

  (() => {
    let commonList = [...input];
    let leastList = [...input];
    let index = 0;

    while (commonList.length > 1) {
      for (let y = index; y < bitLen; y++) {
        let ones = 0;
        let zeros = 0;

        for (let i = 0; i < commonList.length; i++) {
          if (commonList[i]![y] === '1') {
            ones++;
          } else {
            zeros++;
          }
        }

        if (ones >= zeros) {
          commonList = commonList.filter((o) => o[y] === '1');
        } else {
          commonList = commonList.filter((o) => o[y] === '0');
        }

        index++;
        break;
      }
    }

    index = 0;

    while (leastList.length > 1) {
      for (let y = index; y < bitLen; y++) {
        let ones = 0;
        let zeros = 0;

        for (let i = 0; i < leastList.length; i++) {
          if (leastList[i]![y] === '1') {
            ones++;
          } else {
            zeros++;
          }
        }

        if (zeros <= ones) {
          leastList = leastList.filter((o) => o[y] === '0');
        } else {
          leastList = leastList.filter((o) => o[y] === '1');
        }

        index++;
        break;
      }
    }

    const sum =
      binaryToDecimal(commonList.join('')) *
      binaryToDecimal(leastList.join(''));

    Logger.success(`Part 2: ${sum}`);
  })();
};

const binaryToDecimal = (binary: string): number => parseInt(binary, 2);
