const input = require('./input');

const day17 = () => {
    let map = [];
    let row = [];
    let terminate = false;
    let relativeBase = 0;

    const calcOutput = (output) => {
        switch (output) {
            case 10:
                map.push([...row]);
                row = [];
                break;
            case 35:
                row.push('#')
                break;
            case 46:
                row.push('.');
                break;
            default:
                console.log('Something went wrong (calcOutput)', output);
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
                input[mode1 == 0 ? param1 : param1 + relativeBase] = userInput;
                i += 2;
                break;
            case '04':
                calcOutput(val1);
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

    let intersections = [];

    for (let i = 1; i < map.length - 1; i++) {
        for (let y = 1; y < map[i].length - 1; y++) {
            if (map[i][y] === '#' && map[i - 1][y] === '#' && map[i + 1][y] === '#' && map[i][y - 1] === '#' && map[i][y + 1] === '#') {
                intersections.push({ i, y });
            }
        }
    }

    const intersectionSum = intersections.reduce((acc, { i, y }) => {
        return acc += i * y;
    }, 0);

    console.log('intersectionSum', intersectionSum);
    console.log('Program finished');
};

module.exports = day17;