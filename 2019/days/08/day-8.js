const chalk = require('chalk');
const { done } = require('../../utils/console-logger');
const { input } = require('./input');

const parseInput = () => input.split('').map(Number);

const partOne = () => {
    const image = parseInput();
    const [layerLeastZeros] = generateLayers(image)
        .map(o => o.reduce((a, b) => a.concat(b)))
        .sort(sortArrByLeastZeros);

    const ones = layerLeastZeros.filter(o => o === 1).length;
    const twos = layerLeastZeros.filter(o => o === 2).length;

    done('Program finished', 'Part 1', ones * twos);
};

const partTwo = () => {
    const image = parseInput();
    const layers = generateLayers(image)
        .map(o => o.reduce((a, b) => a.concat(b)));
    let decodedImage = [];

    for (let i = 0; lenI = layers[0].length, i < lenI; i++) {
        for (let y = 0; lenY = layers.length, y < lenY; y++) {
            const digit = layers[y][i];
            if (digit === 0 || digit === 1) {
                decodedImage.push(digit);
                break;
            }
        }
    }

    const [messageArr] = generateLayers(decodedImage);
    let output = '';

    for (let i = 0; lenI = messageArr.length, i < lenI; i++) {
        let row = '';
        for (let y = 0; y < messageArr[i].length; y++) {
            row += messageArr[i][y] === 1 ? chalk.bgRedBright(' ') : ' ';
        }
        output += `${row}\n`;
    }

    console.log(output);
    done('Program finished', 'Part 2');
};

const generateLayers = (arr, wide = 25, tall = 6) => {
    let layers = [];

    while (arr.length > 0) {
        let layer = [];

        for (let i = 0; i < tall; i++) {
            layer.push(arr.splice(0, wide));
        }

        layers.push(layer);
    }

    return layers;
};

const sortArrByLeastZeros = (a, b) => a.filter(o => o === 0).length - b.filter(o => o === 0).length;

module.exports = {
    partOne,
    partTwo
};