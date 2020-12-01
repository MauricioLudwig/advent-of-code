import chalk from 'chalk';

console.log(chalk.blueBright('app.ts running!'));

/**
 * * In order to use:
 * 1. import (default) function from './days/XX' where XX represents the day
 * 2. invoke said imported function
 *
 * * For example:
 * import myFunc from './days/01;
 * myFunc();
 */

import myFunc from './days/01';
myFunc();

console.log(chalk.blueBright('app.ts finished execution!'));
