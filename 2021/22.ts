import { Input, Logger } from "../@@utils";

type Range = {
  from: number;
  to: number;
};

type Step = {
  on: boolean;
  x: Range;
  y: Range;
  z: Range;
};

export default async () => {
  const input = new Input("./2021/files/22.txt").asArray.map((o): Step => {
    const [, on, fromX, toX, fromY, toY, fromZ, toZ] =
      o.match(
        /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/
      ) ?? [];
    return {
      on: on === "on",
      x: {
        from: +fromX!,
        to: +toX!,
      },
      y: {
        from: +fromY!,
        to: +toY!,
      },
      z: {
        from: +fromZ!,
        to: +toZ!,
      },
    };
  });

  const cubes = new Map<string, boolean>();

  input.forEach((o) => {
    if (
      [o.z.from, o.y.from, o.x.from].some((o) => o > 50) ||
      [o.z.to, o.y.to, o.x.to].some((o) => o < -50)
    ) {
      return;
    }

    const z1 = getMaxValue(o.z.to);
    const y1 = getMaxValue(o.y.to);
    const x1 = getMaxValue(o.x.to);

    for (let z = getMaxValue(o.z.from); z <= z1; z++) {
      for (let y = getMaxValue(o.y.from); y <= y1; y++) {
        for (let x = getMaxValue(o.x.from); x <= x1; x++) {
          const k = [x, y, z].join(",");
          cubes.set(k, o.on);
        }
      }
    }
  });

  const onCount = [...cubes.values()].filter((o) => o).length;
  Logger.success(`Part 1: ${onCount}`);
};

const getMaxValue = (n: number): number => {
  if (n > 50) {
    return 50;
  } else if (n < -50) {
    return -50;
  } else {
    return n;
  }
};
