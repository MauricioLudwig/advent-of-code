const { done } = require('../../utils/console-logger');
const puzzleInput = require('./input');

const partOne = () => {
    const { grid } = intCode(puzzleInput());

    let intersections = [];

    for (let i = 1; i < grid.length - 1; i++) {
        for (let y = 1; y < grid[i].length - 1; y++) {
            if (grid[i][y] === '#' && grid[i - 1][y] === '#' && grid[i + 1][y] === '#' && grid[i][y - 1] === '#' && grid[i][y + 1] === '#') {
                intersections.push({ i, y });
            }
        }
    }

    const intersectionSum = intersections.reduce((acc, { i, y }) => {
        return acc += i * y;
    }, 0);

    done('Program finished', 'Part 1', intersectionSum);
};

const partTwo = () => {
    const routine = [ // manual calculation
        'A,A,B,C,B,C,B,C,A,C', // Main
        'R,6,L,8,R,8', // A
        'R,4,R,6,R,6,R,4,R,4', // B
        'L,8,R,6,L,10,L,10', // C
    ];

    let routineAsAscii = routine.map(o => {
        let numbers = o.split(',').map(x => {
            let number = [];
            switch (x) {
                case '10':
                    number.push(49, 48);
                    break;
                default:
                    number.push(x.charCodeAt(0));
                    break;
            }
            return [...number, 44]; // 44 = ,
        }).flat();
        numbers.pop(); // remove last comma
        return [...numbers, 10]; // 10 = \n
    }).flat();

    const continousFeed = true;
    routineAsAscii.push(continousFeed ? 121 : 110);
    routineAsAscii.push(10);

    const { outputArr } = intCode(puzzleInput(2), Array.from(routineAsAscii));

    done('Program finished', 'Part 2', outputArr.pop());
};

const intCode = (input, userInput) => {
    let grid = [];
    let row = [];
    let terminate = false;
    let relativeBase = 0;
    const outputArr = [];

    const convertToAscii = (text) => {
        switch (text) {
            case 10:
                grid.push([...row]);
                row = [];
                break;
            default:
                row.push(String.fromCharCode(text));
                break;
        }
    };

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
                input[mode1 == 0 ? param1 : param1 + relativeBase] = userInput.shift();
                i += 2;
                break;
            case '04':
                outputArr.push(val1);
                convertToAscii(val1);
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
                console.log('Something went wrong (IntCode)', operation);
                terminate = true;
                break;
        }

        if (terminate) {
            break;
        }
    }

    return { grid, outputArr };
};

const printMap = (grid) => {
    let output = '';

    for (let i = 0; len = grid.length, i < len; i++) {
        let row = '';
        for (let y = 0; y < grid[i].length; y++) {
            row += grid[i][y];
        }
        output += `${row}\n`;
    }

    console.log(output);
};

module.exports = {
    partOne,
    partTwo
};