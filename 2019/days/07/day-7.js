const { done } = require('../../utils/console-logger');
const {
    input,
    part1,
    part2
} = require('./input');

const PROGRAM_STATUS = {
    CONTINUE: 'CONTINUE',
    END: 'END'
};

const partOne = () => {
    let signals = [];
    const phasePermutations = generatePermutations([0, 1, 2, 3, 4]);
    let sequence = Array.from(input);

    for (let i = 0; lenI = phasePermutations.length, i < lenI; i++) {
        let output = 0;
        for (let y = 0; lenY = phasePermutations[i].length, y < lenY; y++) {
            const optCodeRes = optCode(sequence, undefined, [phasePermutations[i][y], output]);
            output = optCodeRes.output;
        }
        signals.push(output);
    }

    done('Program finished', 'Part 1', signals.sort((a, b) => b - a)[0]);
};

const partTwo = () => {
    let signals = [];
    const phasePermutations = generatePermutations([5, 6, 7, 8, 9]);

    for (let i = 0; lenI = phasePermutations.length, i < lenI; i++) {
        let amplifiers = [];

        for (let y = 0; lenY = phasePermutations[i].length, y < lenY; y++) {
            amplifiers.push({
                sequence: Array.from(input),
                index: 0,
                instructions: [phasePermutations[i][y]]
            });
        }

        let terminate = false;
        let output = 0;

        while (true) {
            for (let z = 0; lenZ = amplifiers.length, z < lenZ; z++) {
                let amplifier = amplifiers[z];
                amplifier.instructions.push(output);
                const optCodeRes = optCode(...Object.values(amplifier));
                amplifier.index = optCodeRes.i;
                output = optCodeRes.output;
                if ((z === lenZ - 1) && optCodeRes.status === PROGRAM_STATUS.END) {
                    signals.push(output);
                    terminate = true;
                }
            }

            if (terminate) {
                break;
            }
        }
    }

    done('Program finished', 'Part 2', signals.sort((a, b) => b - a)[0]);
};

const optCode = (sequence, index = 0, instructions) => {
    let output = undefined;
    let terminate = false;

    for (let i = index; i < sequence.length;) {
        const opt = sequence[i].toString();
        const operation = opt.length === 1
            ? `0${opt}`
            : opt.substr(-2);

        const param1 = sequence[i + 1];
        const param2 = sequence[i + 2];
        const param3 = sequence[i + 3];

        const [, , mode1 = 0, mode2 = 0, mode3 = 0] = [...opt].reverse();

        const val1 = mode1 == 0 ? sequence[param1] : param1;
        const val2 = mode2 == 0 ? sequence[param2] : param2;

        switch (operation) {
            case '01':
                sequence[param3] = val1 + val2;
                i += 4;
                break;
            case '02':
                sequence[param3] = val1 * val2;
                i += 4;
                break;
            case '03':
                if (instructions.length === 0) {
                    return {
                        sequence,
                        i,
                        output,
                        status: PROGRAM_STATUS.CONTINUE
                    };
                }
                sequence[param1] = instructions.shift();
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
                sequence[param3] = val1 < val2 ? 1 : 0;
                i += 4;
                break;
            case '08':
                sequence[param3] = val1 == val2 ? 1 : 0;
                i += 4;
                break;
            case '99':
                return {
                    sequence,
                    i,
                    output,
                    status: PROGRAM_STATUS.END
                };
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
};

module.exports = {
    partOne,
    partTwo
};