import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface Tower {
  name: string;
  weight: number;
  discs: string[];
}

export default (): void => {
  const input = getAsArray('07.txt');
  const towers = input.map(
    (o): Tower => {
      const [left, right] = o.split('->');
      const [, name, weight] = left.match(/(\w+) \((\d+)\)/) ?? [];
      const discs = right?.split(',').map((o): string => o.trim()) ?? [];

      return {
        name,
        weight: parseInt(weight, 10),
        discs,
      };
    }
  );

  const [origin] = towers.filter(
    (o) => !towers.some((x) => x.discs.includes(o.name))
  );

  success(`Part 1: ${origin.name}`);
  calcTowerWeight(origin.name, towers); // Part 2
  end();
};

type CalcTowerWeight = (name: string, towers: Tower[]) => number;

const calcTowerWeight: CalcTowerWeight = (name, towers) => {
  const tower = towers.find((o) => o.name === name);

  if (!tower) {
    return 0;
  }

  const subTowers = tower.discs.map((disc): {
    name: string;
    totalWeight: number;
  } => ({
    name: disc,
    totalWeight: calcTowerWeight(disc, towers),
  }));

  if (!subTowers.every((o) => o.totalWeight === subTowers[0].totalWeight)) {
    const [subTower] = subTowers.filter((o, oi) => {
      return !subTowers.some(
        (x, xi) => oi !== xi && o.totalWeight === x.totalWeight
      );
    });

    const [n1, n2] = Array.from(
      new Set(subTowers.map((o): number => o.totalWeight))
    );

    const subTowerWeight =
      towers.find((o) => o.name === subTower.name)?.weight ?? 0;
    success(`Part 2: ${subTowerWeight - Math.abs(n1 - n2)}`); // only applicable for first instance
  }

  return (
    tower.weight + subTowers.reduce((acc, curr) => acc + curr.totalWeight, 0)
  );
};
