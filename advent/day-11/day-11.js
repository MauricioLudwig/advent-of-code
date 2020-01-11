const chalk = require('chalk');
const puzzleInput = require('./input');

let x = 0;
let y = 0;
let direction = 'U';

const partOne = () => {
    let input = [...puzzleInput];
    let panels = [];
    let terminate = false;
    let relativeBase = 0;
    let pendingColor = true;
    let compInput = 1; // black = 0, white = 1

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
                input[mode1 == 0 ? param1 : param1 + relativeBase] = compInput;
                i += 2;
                break;
            case '04':
                if (pendingColor) {
                    let panel = panels.find(o => o.x == x && o.y == y);
                    if (panel) {
                        panel.coating = val1;
                    } else {
                        panels.push({ x, y, coating: val1 });
                    }
                } else {
                    calculateDirection(val1);
                    let panel = panels.find(o => o.x == x && o.y == y);
                    compInput = (panel && panel.coating) || 0;
                }
                pendingColor = !pendingColor;
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
                console.log('Finished execution');
                terminate = true;
                break;
            default:
                console.log('Something went wrong (intCode program)', operation);
                terminate = true;
                break;
        }

        if (terminate) {
            break;
        }
    }

    return panels;
};

const partTwo = () => {
    const panels = partOne();
    let canvas = '';

    for (let i = 5; i >= -10; i--) {
        let row = '';
        for (let z = 0; z < 50; z++) {
            const panel = panels.find(({ x, y }) => x === z && y === i);
            if (panel) {
                row += panel.coating === 1 ? chalk.bgRedBright(' ') : ' ';
            } else {
                row += ' ';
            }
        }
        canvas += `${row}\n`;
    }

    console.log(canvas);
};

const calculateDirection = (value) => {
    switch (direction) {
        case 'U':
            direction = value == 0 ? 'L' : 'R';
            break;
        case 'R':
            direction = value == 0 ? 'U' : 'D';
            break;
        case 'L':
            direction = value == 0 ? 'D' : 'U';
            break;
        case 'D':
            direction = value == 0 ? 'R' : 'L';
            break;
        default:
            console.log('Something went wrong (re-align)');
            break;
    }

    switch (direction) {
        case 'U':
            y++;
            break;
        case 'R':
            x++;
            break;
        case 'L':
            x--;
            break;
        case 'D':
            y--;
            break;
        default:
            console.log('Something went wrong (modify position)');
            break;
    }
};

module.exports = {
    partOne,
    partTwo
};