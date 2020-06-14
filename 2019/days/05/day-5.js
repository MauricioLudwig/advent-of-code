const input = require('./input');

// 0 = position mode, i.e. value found at position
// 1 = immediate mode, i.e. direct value

const day5 = (userInput) => {
    let terminate = false;

    for (let i = 0; i < input.length;) {
        const opt = input[i].toString();
        const operation = opt.length === 1
            ? `0${opt}`
            : opt.substr(-2);

        const param1 = input[i + 1];
        const param2 = input[i + 2];
        const param3 = input[i + 3];

        const [, , mode1 = 0, mode2 = 0, mode3 = 0] = [...opt].reverse();

        const valOne = mode1 == 0 ? input[param1] : param1;
        const valTwo = mode2 == 0 ? input[param2] : param2;

        switch (operation) {
            case '01':
                input[param3] = valOne + valTwo;
                i += 4;
                break;
            case '02':
                input[param3] = valOne * valTwo;
                i += 4;
                break;
            case '03':
                input[param1] = userInput;
                i += 2;
                break;
            case '04':
                console.log('output', valOne);
                i += 2;
                break;
            case '05':
                i = valOne != 0 ? valTwo : i + 3;
                break;
            case '06':
                i = valOne == 0 ? valTwo : i + 3;
                break;
            case '07':
                input[param3] = valOne < valTwo ? 1 : 0;
                i += 4;
                break;
            case '08':
                input[param3] = valOne == valTwo ? 1 : 0;
                i += 4;
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
    day5
};