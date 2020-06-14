const { done, success } = require('../../utils/console-logger');
const puzzleInput = require('./input');

const day23 = () => {
  const numberOfComputers = 50;
  let computers = [];

  for (let i = 0; i < numberOfComputers; i++) {
    computers.push({
      nic: [...puzzleInput],
      instructions: [i],
      output: [],
      index: 0,
      relativeBase: 0
    });
  }

  let NAT = {};
  let terminate = false;
  let idleCount = 0;
  let natContinuousTransmissions = 0;

  for (let x = 0; x < Infinity; x++) {
    let idle = true;

    for (let i = 0; i < numberOfComputers; i++) {
      const computer = computers[i];
      const { output, index, relativeBase } = intCode(computer.nic, computer.instructions, computer.index, computer.relativeBase);
      computer.index = index;
      computer.relativeBase = relativeBase;

      if (!output) {
        computer.instructions.push(-1);
      } else {
        idle = false;
        natContinuousTransmissions = 0;
        computer.output.push(output);

        if (computer.output.length === 3) {
          const [address, x, y] = computer.output;
          if (address === 255) {
            NAT.x = x;
            NAT.y = y;

            // Uncomment below for Part 1
            // success(`Y value of address ${address}`, 'Part 1', y);
            // terminate = true;
            // break;
          } else {
            computers[address].instructions.push(x);
            computers[address].instructions.push(y);
          }
          computer.output = [];
        }
      }
    }

    if (terminate) {
      break;
    }

    if (idle) {
      idleCount++;
    } else {
      idleCount = 0;
    }

    if (idleCount > 100) {
      const { x, y } = NAT;

      if (natContinuousTransmissions > 1) {
        success(`Y value of 2nd continuous iteration`, 'Part 2', y);
        terminate = true;
        break;
      }

      computers[0].instructions = [x, y];
      idleCount = 0;
      natContinuousTransmissions++;
    }
  }

  done('Program finished', 'day 23');
};

const intCode = (input, userInput, index, lastRelativeBase) => {
  let terminate = false;
  let relativeBase = lastRelativeBase;

  for (let i = index; i < input.length;) {
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
        input[mode1 == 0 ? param1 : param1 + relativeBase] = userInput.shift();
        i += 2;
        return {
          index: i,
          relativeBase
        };
      case '04':
        i += 2;
        return {
          output: val1,
          index: i,
          relativeBase
        };
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

    if (terminate) {
      break;
    }
  }
};

module.exports = day23;
