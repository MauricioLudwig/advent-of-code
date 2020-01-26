const chalk = require('chalk');
const logUpdate = require('log-update');
const { done, success, danger } = require('../utils/console-logger');
const { sleep } = require('../utils/utils');
const getInput = require('./input');

let position = { x: 0, y: 0 };
let oxygenSystemPosition = undefined;
let traversedPositions = [];
let direction = 3;

const partOne = async () => {
  const input = getInput();
  await intCode(input);

  await printMap(traversedPositions);
  const steps = calculateFewestSteps();

  success('Oxygen system', undefined, `(x: ${oxygenSystemPosition.x}, y: ${oxygenSystemPosition.y})`);
  success('Number of fewest steps', undefined, steps);
  done('Program finished', 'Part 1');
};

const partTwo = async () => {
  const input = getInput();
  await intCode(input, true);

  let area = getUniquePositions(traversedPositions);
  let oxygenNodes = [{ ...oxygenSystemPosition }];
  let minutes = 0;

  while (true) {
    let newOxygenNodes = [];

    for (let i = 0; len = oxygenNodes.length, i < len; i++) {
      const nodes = attemptOxygenSpread(area, oxygenNodes[i]);
      newOxygenNodes = newOxygenNodes.concat(JSON.parse(JSON.stringify(nodes)));
    }

    area = JSON.parse(JSON.stringify(area.filter(o => {
      return !oxygenNodes.some(n => o.x === n.x && o.y === n.y);
    })));
    oxygenNodes = JSON.parse(JSON.stringify(newOxygenNodes));

    if (area.length === 0) {
      break;
    }

    // await printMap(area); // COMMENT/UNCOMMENT TO PRINT MAP CONTINOUSLY
    minutes++;
  }

  done('Program finished', 'Part 2', minutes);
};

const intCode = async (sequence, scanEntireArea = false) => {
  let terminate = false;
  let relativeBase = 0;

  for (let i = 0; i < sequence.length;) {
    const opt = sequence[i].toString();
    const operation = opt.length === 1
      ? `0${opt}`
      : opt.substr(-2);

    const param1 = sequence[i + 1];
    const param2 = sequence[i + 2];
    const param3 = sequence[i + 3];

    const [, , mode1 = 0, mode2 = 0, mode3 = 0] = [...opt].reverse();

    const val1 = mode1 == 0 ? sequence[param1] : mode1 == 1 ? param1 : sequence[param1 + relativeBase];
    const val2 = mode2 == 0 ? sequence[param2] : mode2 == 1 ? param2 : sequence[param2 + relativeBase];
    const val3 = mode3 == 0 ? param3 : param3 + relativeBase;

    switch (operation) {
      case '01':
        sequence[val3] = val1 + val2;
        i += 4;
        break;
      case '02':
        sequence[val3] = val1 * val2;
        i += 4;
        break;
      case '03':
        sequence[mode1 == 0 ? param1 : param1 + relativeBase] = direction;
        i += 2;
        break;
      case '04':
        terminate = await processStatusCode(val1, scanEntireArea);
        i += 2;
        break;
      case '05':
        i = val1 != 0 ? val2 : i + 3;
        break;
      case '06':
        i = val1 == 0 ? val2 : i + 3;
        break;
      case '07':
        sequence[val3] = val1 < val2 ? 1 : 0;
        i += 4;
        break;
      case '08':
        sequence[val3] = val1 == val2 ? 1 : 0;
        i += 4;
        break;
      case '09':
        relativeBase += val1;
        i += 2;
        break;
      case '99':
        success('Finished execution', 'intCode', operation);
        terminate = true;
        break;
      default:
        danger('Unexpected case detected', 'intCode', operation);
        terminate = true;
        break;
    }

    if (terminate) {
      break;
    }
  }
};

const processStatusCode = async (status, scanEntireArea) => {
  let terminate = false;
  const { newPosition, newDirection, nextAttempt } = getPosAndFindNextDir();

  switch (status) {
    case 0:
      direction = nextAttempt;
      break;
    case 1:
      position = { ...newPosition };
      traversedPositions.push({ ...position });
      direction = newDirection;
      break;
    case 2:
      position = { ...newPosition };
      traversedPositions.push({ ...position });
      oxygenSystemPosition = { ...position };
      terminate = true;
      break;
    default:
      danger('Unexpected case detected', 'processStatusCode', status);
      terminate = true;
      break;
  }

  // await printMap(); // COMMENT/UNCOMMENT TO PRINT MAP CONTINOUSLY

  if (scanEntireArea) {
    terminate = false;
  }

  if (newPosition.x === 0 && newPosition.y === 0) {
    terminate = true;
  }

  return terminate;
};

const getPosAndFindNextDir = () => {
  let newPosition = { ...position };
  let newDirection = undefined;
  let nextAttempt = undefined;

  switch (direction) {
    case 1:
      newPosition.y = newPosition.y - 1;
      newDirection = 4;
      nextAttempt = 3;
      break;
    case 2:
      newPosition.y = newPosition.y + 1;
      newDirection = 3;
      nextAttempt = 4;
      break;
    case 3:
      newPosition.x = newPosition.x - 1;
      newDirection = 1;
      nextAttempt = 2;
      break;
    case 4:
      newPosition.x = newPosition.x + 1;
      newDirection = 2;
      nextAttempt = 1;
      break;
    default:
      danger('Unexpected case detected', 'getPosAndFindNextDir', direction);
      break;
  }

  return { newPosition, newDirection, nextAttempt };
};

const printMap = async (map) => {
  let mapOutput = '';

  for (let y = -25; y < 25; y++) {
    let row = '';
    for (let x = -25; x < 25; x++) {
      if (y === 0 && x === 0) {
        row += 'O';
        continue;
      }

      if (oxygenSystemPosition && (oxygenSystemPosition.x === x && oxygenSystemPosition.y === y)) {
        row += chalk.yellowBright('X');
        continue;
      }

      if (position.x === x && position.y === y) {
        row += chalk.magentaBright('@');
        continue;
      }

      if (map.findIndex(o => o.x === x && o.y === y) !== -1) {
        row += '.';
        continue;
      }

      row += ' ';
    }

    mapOutput += `${row}\n`;
  }

  logUpdate(mapOutput);
  await sleep(25);
};

const calculateFewestSteps = () => {
  let steps = 0;
  let positions = JSON.parse(JSON.stringify(traversedPositions));

  while (positions.length > 0) {
    const { x, y } = positions.shift();
    const duplicateIndex = positions.findIndex(o => o.x === x && o.y === y);

    if (duplicateIndex !== -1) {
      positions.splice(0, duplicateIndex);
    } else {
      steps++;
    }
  }

  return steps;
};

const getUniquePositions = (arr) => {
  let uniqueArr = [];

  for (let i = 0; len = arr.length, i < len; i++) {
    const position = arr[i];
    if (uniqueArr.some(({ x, y }) => x === position.x && y === position.y)) {
      continue;
    }

    uniqueArr.push({ ...position });
  }

  return uniqueArr;
};

const attemptOxygenSpread = (area, { x, y }) => {
  const newNodes = area.filter(o => {
    const north = (o.y === y - 1) && (o.x === x);
    const west = (o.y === y) && (o.x === x - 1);
    const south = (o.y === y + 1) && (o.x === x);
    const east = (o.y === y) && (o.x === x + 1);
    return north || west || south || east;
  });

  return newNodes;
};

module.exports = {
  partOne,
  partTwo
};