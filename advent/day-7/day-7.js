const input = require('./input');

const day7 = () => {
    let signals = [];
    let phasePermutations = generatePermutations([0, 1, 2, 3, 4]);;

    for (let i = 0; i < phasePermutations.length; i++) {
        let output = 0;
        for (let y = 0; y < phasePermutations[i].length; y++) {
            output = optComp(output, phasePermutations[i][y]);
        }
        signals.push(output);
    }

    console.log('signals', signals.sort((a, b) => b - a));
    return signals[0];
};

const optComp = (userInput, phase) => {
    let output = undefined;
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
                input[param1] = phase;
                phase = userInput; // set second input instruction
                i += 2;
                break;
            case '04':
                output = valOne;
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

    return output;
};

const generatePermutations = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };

    permute(inputArr);
    return result;
}

module.exports = {
    day7
};