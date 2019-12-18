const {
    puzzleInput
} = require('./input');

const day16 = () => {
    const pattern = [0, 1, 0, -1];
    let input = puzzleInput.split('');

    for (let i = 0; i < 100; i++) {
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

    console.log('first eight digits', input.slice(0, 8).join(''));
    console.log('Program finished');
};

const getLastDigit = number => number.toString().slice(-1);

module.exports = day16;