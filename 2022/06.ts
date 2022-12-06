import { Input, Logger } from "../@@utils";

export default async () => {
  const input = new Input("./2022/files/06.txt").asSingleLine;

  Logger.success(`Part 1: ${findMarker(input, 4)}`);
  Logger.success(`Part 2: ${findMarker(input, 14)}`);
};

const findMarker = (input: string, count: number): number => {
  for (let i = 0; i < input.length - count - 1; i++) {
    const subArr = input.slice(i, i + count);

    if (new Set(subArr).size === subArr.length) {
      return i + count;
    }
  }

  throw new Error(`No marker found for ${count} distinct characters`);
};
