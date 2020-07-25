const chalk = require('chalk');
const { success, done } = require('../../utils/console-logger');
const puzzleInput = require('./input');

const partOne = () => {
    const gridSize = 50;
    let area = [];

    for (let y = 0; y < gridSize; y++) {
        let row = [];
        for (let x = 0; x < gridSize; x++) {
            const output = IntCodeProgram(x, y);
            row.push(output);
        }
        area.push([...row]);
    }

    const points = area.flat().filter(o => o === 1).length;
    done('Program finished', 'Part 1', points);
};

const partTwo = () => {
    const offset = 99;
    const max = 10000;
    let terminate = false;

    for (let y = 0; y < max; y++) {
        for (let x = 0; x < max; x++) {
            let output = IntCodeProgram(x, y);
            let index = x;

            if (!output) {
                continue;
            }

            while (output) {
                const offsetX = IntCodeProgram(index + offset, y);
                const offsetY = IntCodeProgram(index, y + offset);
                if (offsetX && offsetY) {
                    console.log(chalk.magenta(`x: ${index}, y: ${y}`));
                    success('Solution', 'Part 2', index * 10000 + y);
                    terminate = true;
                    break;
                }
                output = IntCodeProgram(++index, y);
            }

            break;
        }

        if (terminate) {
            break;
        }
    }

    done('Program finished', 'Part 2');
};

const IntCodeProgram = (x, y) => {
    let terminate = false;
    let relativeBase = 0;
    let output;
    let input = [...puzzleInput];

    for (let i = 0; i < input.length;) {
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
                input[mode1 == 0 ? param1 : param1 + relativeBase] = x;
                x = y;
                i += 2;
                break;
            case '04':
                output = val1;
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
                terminate = true;
                break;
            default:
                console.log('Something went wrong', operation);
                terminate = true;
                break;
        }

        if (terminate) {
            break;
        }
    }

    return output;
};

module.exports = {
    partOne,
    partTwo
};