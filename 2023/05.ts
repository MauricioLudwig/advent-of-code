import { Input, Logger } from "../@@utils";

type SeedMap = {
  from: string;
  to: string;
  ranges: Array<{
    destination: number;
    source: number;
    range: number;
  }>;
};

export default async () => {
  const [seedsLs, ...rest] = new Input("./2023/files/05.txt").AsMatrix("");

  const seeds = (seedsLs?.[0]!.match(/(\d+)/g) ?? []).map(Number);

  const seedMaps = rest.map((o): SeedMap => {
    const [text, ...numbers] = o;
    const [, from, to] = text!.match(/(\w+)-to-(\w+)/) ?? [];

    const ranges = numbers.map((range) => {
      const [d, s, r] = (range.match(/(\d+)/g) ?? []).map(Number);
      return {
        destination: d!,
        source: s!,
        range: r!,
      };
    });

    return {
      from: from!,
      to: to!,
      ranges,
    };
  });

  Logger.success(`Part 1: ${part1(seeds, seedMaps)}`);
  // TODO: Fix brute-force solution
  Logger.success(`Part 2: ${part2(seeds, seedMaps)}`);
};

const part2 = (seeds: number[], seedMaps: SeedMap[]) => {
  const ranges: number[][] = [];
  const seedsCopy = [...seeds];

  while (seedsCopy.length > 0) {
    ranges.push(seedsCopy.splice(0, 2));
  }

  let min = Infinity;

  ranges.forEach((range) => {
    const [start, end] = range;

    for (let i = start!; i < start! + end! - 1; i++) {
      const value = findDestinationRecursive("seed", i, seedMaps);
      if (value < min) {
        min = value;
      }
    }
  });

  return min;
};

const part1 = (seeds: number[], seedMaps: SeedMap[]): number => {
  const locationNumbers = seeds.map((o) =>
    findDestinationRecursive("seed", o, seedMaps)
  );
  return Math.min(...locationNumbers);
};

export const findDestinationRecursive = (
  from: string,
  source: number,
  seedMaps: SeedMap[]
): number => {
  const seedMap = seedMaps.find((o) => o.from === from);

  if (!seedMap) {
    return source;
  }

  const nextSeedMap = seedMap.ranges.find(
    (o) => source >= o.source && source < o.range + o.source
  );

  if (!nextSeedMap) {
    return findDestinationRecursive(seedMap.to, source, seedMaps);
  }

  const destination = nextSeedMap.destination - nextSeedMap.source + source;
  return findDestinationRecursive(seedMap.to, destination, seedMaps);
};

export const getRange = (start: number, range: number): number[] =>
  [...Array(range)].map((_, i) => i + start);
