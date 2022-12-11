import { Input, Logger } from "../@@utils";
import chalk from "chalk";

export default async () => {
  const input = new Input("./2022/files/10.txt").asArray.map((o) => {
    const [, n] = o.match(/(-?\d+)/) ?? [];
    return n ? parseInt(n, 10) : null;
  });

  let x = 1;
  let cycle = 0;
  let signalStrength = 0;
  let i = 0;
  const crt = [...Array(240)].map(() => "");

  while (cycle < 240) {
    const value = input[i++] ?? 0;
    drawPixel(crt, ++cycle - 1, x);
    signalStrength += getSignalStrength(cycle, x);

    if (value) {
      drawPixel(crt, ++cycle - 1, x);
      signalStrength += getSignalStrength(cycle, x);
      x += value;
    }

    if (i === input.length) {
      i = 0;
    }
  }

  Logger.success(`Part 1: ${signalStrength}`);

  // Part 2
  drawImage(crt);
};

const getSignalStrength = (cycle: number, signalStrength: number): number =>
  (cycle - 20) % 40 === 0 ? cycle * signalStrength : 0;

const drawPixel = (crt: Array<string>, cycle: number, x: number): void => {
  const isLit = cycle % 40 >= x - 1 && cycle % 40 <= x + 1;
  crt[cycle] = isLit ? "#" : ".";
};

const drawImage = (crt: Array<string>): void => {
  let s = "";

  for (let i = 1; i <= 240; i++) {
    s += crt[i - 1] === "#" ? chalk.bgBlue("#") : ".";

    if (i % 40 === 0) {
      s += "\n";
    }
  }

  console.log(s);
};
