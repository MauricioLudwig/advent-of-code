import { Input, Logger } from "../@@utils";

type TNode = {
  x: number;
  y: number;
};

type TInput = {
  dir: string;
  steps: number;
};

export default async () => {
  const input: Array<TInput> = new Input("./2022/files/09.txt").asArray.map(
    (o) => {
      const [, dir = "", steps = ""] = o.match(/(R|U|L|D) (\d+)/) ?? [];
      return {
        dir,
        steps: parseInt(steps, 10),
      };
    }
  );

  (() => {
    const nodes = simulateMotion(input, {
      0: { x: 0, y: 0 },
      1: { x: 0, y: 0 },
    });

    Logger.success(`Part 1: ${Object.keys(nodes?.["1"] ?? {}).length}`);
  })();

  (() => {
    const nodes = simulateMotion(input, {
      ...[...Array(10)].reduce(
        (acc, _, i) => ({
          ...acc,
          [i]: {
            x: 0,
            y: 0,
          },
        }),
        {}
      ),
    });

    Logger.success(`Part 2`);
  })();
};

const simulateMotion = (
  input: Array<TInput>,
  nodes: Record<string, TNode>
): Record<string, Record<string, boolean>> => {
  const visitedNodes: Record<string, Record<string, boolean>> = {};

  input.forEach(({ dir, steps }) => {
    [...Array(steps)].forEach(() => {
      Object.entries(nodes).forEach(([k, v], i, arr) => {
        const prevNode = arr?.[i - 1]?.[1] ?? null;

        const [x, y] = simulateNodeMotion(dir, v, prevNode);

        const node = nodes[k];

        if (!node) {
          throw new Error(`Node was not found for ${k}`);
        }

        node.x = x;
        node.y = y;

        if (!visitedNodes[k]) {
          visitedNodes[k] = {};
        }
        // @ts-expect-error
        visitedNodes[k][`${node.x},${node.y}`] = true;
      });
    });

    // printGrid();
  });

  return visitedNodes;
};

const simulateNodeMotion = (
  dir: string,
  curNode: TNode,
  prevNode: TNode | null
): [number, number] => {
  let nextX = 0;
  let nextY = 0;

  switch (dir) {
    case "L":
      if (!prevNode) {
        nextX--;
      } else {
        if (isOutsideRange(prevNode, curNode)) {
          nextX--;
          nextY = prevNode.y - curNode.y;
        }
      }
      break;
    case "R":
      if (!prevNode) {
        nextX++;
      } else {
        if (isOutsideRange(prevNode, curNode)) {
          nextX++;
          nextY = prevNode.y - curNode.y;
        }
      }
      break;
    case "U":
      if (!prevNode) {
        nextY++;
      } else {
        if (isOutsideRange(prevNode, curNode)) {
          nextX = prevNode.x - curNode.x;
          nextY++;
        }
      }
      break;
    case "D":
      if (!prevNode) {
        nextY--;
      } else {
        if (isOutsideRange(prevNode, curNode)) {
          nextX = prevNode.x - curNode.x;
          nextY--;
        }
      }
      break;
    default:
      throw new Error(`No match found for ${dir}`);
  }

  return [curNode.x + nextX, curNode.y + nextY];
};

const isOutsideRange = (n1: TNode, n2: TNode): boolean => {
  const xRange = Math.abs(n1.x - n2.x);
  const yRange = Math.abs(n1.y - n2.y);
  return [xRange, yRange].some((o) => o > 1);
};

const printGrid = (nodes: Record<string, TNode>) => {
  let s = "";

  const values = Object.values(nodes);
  const maxY = Math.max(...values.map((o) => o.y));
  const maxX = Math.max(...values.map((o) => o.x));

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (values.some((o) => o.x === x && o.y === y)) {
        s += "x";
      } else {
        s += ".";
      }
    }

    s += "\n";
  }

  Object.keys(nodes).forEach((o) => {
    const { x, y } = nodes[o] ?? {};
  });
};
