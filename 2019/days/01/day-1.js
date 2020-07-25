const fs = require('fs');
const path = require('path');

const getNumbers = () => {
    const fileName = process.env.MODE === 'test'
        ? 'numbers-test.txt'
        : 'numbers.txt';

    return fs
        .readFileSync(path.resolve(__dirname, fileName))
        .toString()
        .split('\n');
};

const partOne = () => {
    const numbers = getNumbers();

    return numbers.reduce((acc, num) => {
        return acc + (Math.floor(num / 3) - 2);
    }, 0);
};

const partTwo = () => {
    const numbers = getNumbers();

    return numbers.reduce((acc, num) => {
        let fuelSum = 0;
        let fuel = num;
        while (true) {
            fuel = Math.floor(fuel / 3) - 2;
            if (fuel < 1) {
                break;
            }
            fuelSum += fuel;
        }
        return acc + fuelSum;
    }, 0);
};

module.exports = {
    partOne,
    partTwo
};
