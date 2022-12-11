// @ts-nocheck
import { Input, Logger } from "../@@utils";

type Monkey = {
  i: number;
  items: Array<number>;
  operation: {
    o1: string | number;
    o2: string | number;
    operand: string;
  };
  division: {
    by: number;
    t: number;
    f: number;
  };
  inspections: number;
};

const isPart1 = true;

export default async () => {
  const monkeys: Array<Monkey> = new Input("./2022/files/11.txt")
    .AsMatrix("")
    .map((o, i) => {
      const [_, s1, s2, s3, s4, s5] = o;

      const [, o1, operand, o2] = s2.match(
        /Operation: new = (old|\d+) (\+|\*) (old|\d+)/
      );

      return {
        i,
        items: getNumsFromString(s1),
        operation: {
          o1: o1 === "old" ? "old" : parseInt(o1, 10),
          o2: o2 === "old" ? "old" : parseInt(o2, 10),
          operand,
        },
        division: {
          by: getNumsFromString(s3)[0],
          t: getNumsFromString(s4)[0],
          f: getNumsFromString(s5)[0],
        },
        inspections: 0,
      };
    });

  const divisor = monkeys.reduce((acc, curr) => acc * curr.division.by, 1);

  for (let i = 0; i < (isPart1 ? 20 : 10_000); i++) {
    monkeys.forEach((monkey) => {
      const {
        items,
        operation: { operand, o1, o2 },
        division: { by, t, f },
      } = monkey;

      while (items.length > 0) {
        monkey.inspections++;
        let item = items.shift();

        const n1 = o1 === "old" ? item : o1;
        const n2 = o2 === "old" ? item : o2;

        if (operand === "+") {
          item = n1 + n2;
        } else if (operand === "*") {
          item = n1 * n2;
        }

        if (isPart1) {
          item = Math.floor(item / 3);
        } else {
          item %= divisor;
        }

        if (item % by === 0) {
          monkeys[t].items.push(item);
        } else {
          monkeys[f].items.push(item);
        }
      }
    });
  }

  const [m1, m2] = monkeys.map((o) => o.inspections).sort((a, b) => b - a);

  Logger.success(`Part ${isPart1 ? "1" : "2"}: ${m1 * m2}`);
};

const getNumsFromString = (s: string) => {
  const nums = s.match(/(\d+)/g);
  return nums.map(Number);
};
