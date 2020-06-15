import chalk from 'chalk';

export const success = msg => console.log(chalk.magenta(msg));
export const danger = msg => console.log(chalk.red(msg));
export const end = () => console.log(chalk.yellow('Program finished!'));