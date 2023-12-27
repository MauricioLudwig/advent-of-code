import chalk from "chalk";

export const success = <T>(msg: T): void => console.log(chalk.green(msg));

export const highlight = <T>(msg: T): void => console.log(chalk.yellow(msg));

export const danger = <T>(msg: T): void => console.log(chalk.red(msg));

export const logPerformance = (t2: number, t1: number): void =>
  highlight(`Time to execute (in ms): ${(t2 - t1).toFixed(4)}`);

export const printGrid = <T>(grid: T[][], omitHeader = false): void => {
  let string = "";

  if (!omitHeader) {
    string = chalk.magentaBright(
      `\nGrid: ${grid.length} x ${grid[0]!.length}\n\n`
    );
  }

  grid.forEach((row) => {
    row.forEach((col) => {
      string += col;
    });
    string += "\n";
  });

  console.log(string);
};
