import chalk from 'chalk';

export class Logger {
  static success<T>(msg: T): void {
    console.log(chalk.green(msg));
  }

  static highlight<T>(msg: T): void {
    console.log(chalk.yellow(msg));
  }

  static danger<T>(msg: T): void {
    console.log(chalk.red(msg));
  }

  static primary<T>(msg: T): void {
    console.log(chalk.blueBright(msg));
  }

  static end<T>(msg: T): void {
    console.log(chalk.magenta(msg));
  }

  static performance(t2: number, t1: number): void {
    this.highlight(
      `Time to execute (in seconds): ${((t2 - t1) / 1000).toFixed(2)}`
    );
  }
}
