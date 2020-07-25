const input = require('./input');

// 0 = position mode, i.e. value found at position
// 1 = immediate mode, i.e. direct value
// 2 = relative base

const day9 = (userInput) => {
    let terminate = false;
    let relativeBase = 0;

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
                console.log('output', val1);
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
                console.log('Something went wrong', operation);
                terminate = true;
                break;
        }

        if (terminate) {
            break;
        }
    }

    console.log('Program finished');
};

module.exports = {
    day9
};