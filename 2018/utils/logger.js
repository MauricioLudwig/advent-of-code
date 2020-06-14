import chalk from 'chalk';

export const success = msg => console.log(chalk.magenta(msg));
export const end = () => console.log(chalk.yellow('Program finished!'));