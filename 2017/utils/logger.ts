import chalk from 'chalk';

export const success = (msg: string) => console.log(chalk.magenta(msg));
export const danger = (msg: string) => console.log(chalk.red(msg));
export const end = () => console.log(chalk.yellow('Program finished!'));
