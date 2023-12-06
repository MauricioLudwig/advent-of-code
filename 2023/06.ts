import { Input, Logger } from "../@@utils";

export default async () => {
  const [times, distances] = new Input("./2023/files/06.txt").asArray.map((o) =>
    o.match(/(\d+)/g)!.map(Number)
  );

  const sum1 = distances!.reduce(
    (acc, curr, i) => acc * getBeatenDistances(times?.[i]!, curr).length,
    1
  );

  Logger.success(`Part 1: ${sum1}`);

  const sum2 = getBeatenDistances(
    parseInt(times!.join(""), 10),
    parseInt(distances!.join(""), 10)
  ).length;

  Logger.success(`Part 2: ${sum2}`);
};

const getBeatenDistances = (maxTime: number, maxDistance: number) => {
  const beatenDistances: number[] = [];

  for (let i = 1; i <= maxTime; i++) {
    const distanceAchieved = i * (maxTime - i);
    if (distanceAchieved > maxDistance) {
      beatenDistances.push(distanceAchieved);
    }
  }

  return beatenDistances;
};
