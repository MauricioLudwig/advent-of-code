const chalk = require('chalk');

const success = (...args) => {
  console.log(chalk.magenta(generateLog(...args)));
};

const warning = (...args) => {
  console.log(chalk.yellow(generateLog(...args)));
};

const danger = (...args) => {
  console.log(chalk.red(generateLog(...args)));
};

const done = (...args) => {
  console.log(chalk.blue(generateLog(...args)));
};

const generateLog = (message, source, param) => {
  let str = message;

  if (source) {
    str += ` (${source})`;
  }

  if (param) {
    str += `: ${param}`;
  }

  return str;
};

module.exports = {
  success,
  warning,
  danger,
  done
};