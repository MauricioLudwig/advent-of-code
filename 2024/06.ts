import { Input, Logger } from "../@@utils";

type Direction = "u" | "d" | "l" | "r";

export default async () => {
  const input = new Input("./2024/files/06.txt").asArray.map((o) =>
    o.split("")
  );

  (() => {
    let { direction, grid, x, y } = initProps(input);

    while (true) {
      const [nextDir, nextY, nextX] = getNextStep(x, y, direction, grid);
      direction = nextDir;
      y = nextY;
      x = nextX;

      if (hasExitedGrid(x, y, grid)) {
        break;
      }
    }

    const distinctVisistedNodes = grid.reduce(
      (acc, curr) => acc + curr.filter((o) => o === "X").length,
      0
    );

    Logger.success(`Part 1: ${distinctVisistedNodes}`);
  })();

  (() => {
    let infiniteLoops = 0;
    let maxSteps = Math.pow(Object.keys(input).length, 2);

    input.forEach((inputY, yi) => {
      inputY.forEach((inputX, xi) => {
        if (["^", "#"].includes(inputX)) {
          return;
        }

        let { direction, grid, x, y } = initProps(input);
        let iterations = 0;
        grid[yi]![xi] = "#";

        while (true) {
          iterations++;
          const [nextDir, nextY, nextX] = getNextStep(x, y, direction, grid);

          direction = nextDir;
          y = nextY;
          x = nextX;

          if (hasExitedGrid(x, y, grid)) {
            break;
          }

          if (iterations > maxSteps) {
            infiniteLoops++;
            break;
          }
        }
      });
    });

    Logger.success(`Part 2: ${infiniteLoops}`);
  })();

  Logger.end("End");
};

const initProps = (
  input: string[][]
): {
  grid: string[][];
  direction: Direction;
  x: number;
  y: number;
} => {
  let x = 0;
  let y = 0;

  input.forEach((yC, yI) => {
    yC.forEach((xC, xI) => {
      if (xC === "^") {
        x = xI;
        y = yI;
      }
    });
  });

  return {
    grid: input.map((o) => [...o]),
    direction: "u",
    x,
    y,
  };
};

const getNextStep = (
  x: number,
  y: number,
  direction: Direction,
  grid: string[][]
): [Direction, number, number] => {
  let nextX = x;
  let nextY = y;
  let nextDir = direction;

  switch (direction) {
    case "u":
      if (hasObstacle(x, y - 1, grid)) {
        nextDir = "r";
      } else {
        markVisitedNode(x, y, grid);
        nextY--;
      }
      break;
    case "d":
      if (hasObstacle(x, y + 1, grid)) {
        nextDir = "l";
      } else {
        markVisitedNode(x, y, grid);
        nextY++;
      }
      break;
    case "l":
      if (hasObstacle(x - 1, y, grid)) {
        nextDir = "u";
      } else {
        markVisitedNode(x, y, grid);
        nextX--;
      }
      break;
    case "r":
      if (hasObstacle(x + 1, y, grid)) {
        nextDir = "d";
      } else {
        markVisitedNode(x, y, grid);
        nextX++;
      }
      break;
    default: {
      throw new Error(`${direction} does not match any cases`);
    }
  }

  return [nextDir, nextY, nextX];
};

const hasObstacle = (x: number, y: number, grid: string[][]): boolean =>
  grid[y]?.[x] === "#";

const hasExitedGrid = (x: number, y: number, grid: string[][]): boolean =>
  typeof grid[y]?.[x] === "undefined";

const markVisitedNode = (x: number, y: number, grid: string[][]): void => {
  grid[y]![x] = "X";
};
