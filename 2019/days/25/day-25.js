const inquirer = require('inquirer');
const chalk = require('chalk');
const { success, danger, done } = require('../../utils/console-logger');
const puzzleInput = require('./input');

const INTCODE_STATUS = {
  REQUESTING_INPUT: 'REQUESTING_INPUT',
  FINISHED: 'FINISHED'
};

const partOne = async () => {
  let input = [...puzzleInput].concat(Array(100000).fill(0));
  let userInput = [];
  let currentIndex = 0;

  while (true) {
    const { output, status, index } = intCode(input, userInput, currentIndex);
    console.log(chalk.magenta(output));

    if (status === INTCODE_STATUS.FINISHED) {
      break;
    }

    const { nextAction } = await inquirer.prompt([{
      name: 'nextAction',
      message: 'Next action?'
    }]);

    currentIndex = index;
    userInput = [...convertToAscii(nextAction)];
    console.log('Next action in ASCII', userInput);
  }

  done('Program finished', 'Part 1');
};

let relativeBase = 0;

const intCode = (input, userInput, currentIndex) => {
  let output = '';
  let status = INTCODE_STATUS.FINISHED;
  let index = undefined;
  let terminate = false;

  for (let i = currentIndex; i < input.length;) {
    const opt = input[i].toString();
    const operation = opt.length === 1
      ? `0${opt}`
      : opt.substr(-2);

    const param1 = input[i + 1];
    const param2 = input[i + 2];
    const param3 = input[i + 3];

    const [, , mode1 = 0, mode2 = 0, mode3 = 0] = [...opt].reverse();

    const val1 = mode1 == 0 ? input[param1] : mode1 == 1 ? param1 : input[param1 + relativeBase];
    const val2 = mode2 == 0 ? input[param2] : mode2 == 1 ? param2 : input[param2 + relativeBase];
    const val3 = mode3 == 0 ? param3 : param3 + relativeBase;

    switch (operation) {
      case '01':
        input[val3] = val1 + val2;
        i += 4;
        break;
      case '02':
        input[val3] = val1 * val2;
        i += 4;
        break;
      case '03':
        if (userInput.length === 0) {
          status = INTCODE_STATUS.REQUESTING_INPUT;
          terminate = true;
          break;
        }
        input[mode1 == 0 ? param1 : param1 + relativeBase] = userInput.shift();
        i += 2;
        break;
      case '04':
        output += String.fromCharCode(val1);
        i += 2;
        break;
      case '05':
        i = val1 != 0 ? val2 : i + 3;
        break;
      case '06':
        i = val1 == 0 ? val2 : i + 3;
        break;
      case '07':
        input[val3] = val1 < val2 ? 1 : 0;
        i += 4;
        break;
      case '08':
        input[val3] = val1 == val2 ? 1 : 0;
        i += 4;
        break;
      case '09':
        relativeBase += val1;
        i += 2;
        break;
      case '99':
        success('Finished execution', 'intCode');
        terminate = true;
        break;
      default:
        danger('Something went wrong', 'intCode', operation);
        terminate = true;
        break;
    }

    index = i;

    if (terminate) {
      break;
    }
  }

  return { output, status, index };
};

const convertToAscii = (str) => [...str, '\n'].map(o => o.charCodeAt(0)); // + append newline (10)

module.exports = {
  partOne
};
