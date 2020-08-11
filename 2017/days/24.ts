import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface IComponent {
  id: string;
  ports: number[];
}

interface IBridge {
  port: number;
  ids: string[];
}

export default (): void => {
  const components = getAsArray('24.txt').map(
    (o): IComponent => {
      return {
        id: o,
        ports: o.split('/').map(Number),
      };
    }
  );

  const validBridges = bridgeFinder(components, {
    port: 0,
    ids: [],
  }).sort((a, b) => b.ids.length - a.ids.length);

  const [maxStrength1] = getBridgeStrengths(validBridges);
  success(`Part 1: ${maxStrength1}`);

  const maxLen = validBridges[0].ids.length;
  const [maxStrength2] = getBridgeStrengths(
    validBridges.filter((o) => o.ids.length === maxLen)
  );
  success(`Part 2: ${maxStrength2}`);

  end();
};

type BridgeFinder = (components: IComponent[], bridge: IBridge) => IBridge[];

const bridgeFinder: BridgeFinder = (components, bridge) => {
  const validComponents = components.filter((o) => {
    return o.ports.includes(bridge.port) && !bridge.ids.includes(o.id);
  });

  if (validComponents.length === 0) {
    return [bridge];
  }

  const bridges = validComponents.map(
    (o): IBridge => {
      const [a, b] = o.ports;
      return {
        port: bridge.port === a ? b : a,
        ids: [...bridge.ids, o.id],
      };
    }
  );

  return bridges.map((o) => bridgeFinder(components, o)).flat();
};

const getBridgeStrengths = (bridges: IBridge[]): number[] => {
  const strengths = bridges.map((bridge) => {
    return bridge.ids.reduce((acc, curr) => {
      const [a, b] = curr.split('/').map(Number);
      return acc + a + b;
    }, 0);
  });

  return strengths.sort((a, b) => b - a);
};
