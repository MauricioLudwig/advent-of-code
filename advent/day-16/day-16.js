const {
    puzzleInput
} = require('./input');

const partOne = () => {
    const phases = 100;
    const pattern = [0, 1, 0, -1];
    let input = puzzleInput.split('');

    for (let i = 0; i < phases; i++) {
        let newInput = [];
        for (let y = 1, len = input.length; y <= len; y++) {
            let repetition = y;
            let patternRepetition = repetition - 1;
            let patternIndex = 0;
            const number = input.reduce((sum, num) => {
                if (patternRepetition === 0) {
                    patternIndex++;
                    patternRepetition = repetition;
                }
                if (patternIndex >= pattern.length) {
                    patternIndex = patternIndex % pattern.length;
                }
                const acc = sum += parseInt(num) * pattern[patternIndex];
                patternRepetition--;
                return acc;
            }, 0);
            newInput.push(getLastDigit(number));
        }
        input = [...newInput];
    }

    console.log('Program finished (part 1): ', input.slice(0, 8).join(''));
};

const getLastDigit = number => number.toString().slice(-1);

const partTwo = () => {
    const phases = 100;
    const inputRepetition = 10000;
    let input = '';

    for (let i = 0; i < inputRepetition; i++) {
        input += puzzleInput;
    }

    const messageOffset = parseInt(input.slice(0, 7));

    for (let i = 0; i < phases; i++) {
        let newInput = '';
        let acc = 0;

        for (let y = input.length - 1; y >= messageOffset; y--) {
            const digit = parseInt(input.charAt(y));
            newInput = ((digit + acc) % 10) + newInput;
            acc += digit;
        }

        input = input.slice(0, messageOffset) + newInput;
    }

    console.log('Program finished (part 2):', input.slice(messageOffset, messageOffset + 8));
};

module.exports = {
    partOne,
    partTwo
};