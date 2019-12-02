const fs = require('fs');
const path = require('path');

const fileName = process.env.MODE === 'test'
    ? 'numbers-test.txt'
    : 'numbers.txt';

const numbers = fs
    .readFileSync(path.resolve(__dirname, fileName))
    .toString()
    .split('\n');

const fuelRequirement = numbers.reduce((acc, num) => {
    return acc + (Math.floor(num / 3) - 2);
}, 0);

module.exports = fuelRequirement;