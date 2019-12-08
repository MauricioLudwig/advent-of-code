const fs = require('fs');
const {
    input,
    fixture1,
    fixture2
} = require('./input');

const parseInput = () => input.split('').map(Number);

const partOne = (wide, tall) => {
    let imgPass = parseInput();
    let layers = generateLayers(imgPass, wide, tall)
        .map(o => o.reduce((a, b) => a.concat(b)));

    const [layerLeastZeros] = Array.from(layers).sort(sortArrByLeastZeros);
    const ones = layerLeastZeros.filter(o => o === 1).length;
    const twos = layerLeastZeros.filter(o => o === 2).length;
    return ones * twos;
};

const partTwo = (wide, tall) => {
    let imgPass = parseInput();
    let layers = generateLayers(imgPass, wide, tall)
        .map(o => o.reduce((a, b) => a.concat(b)));
    let img = [];

    for (let i = 0; i < layers[0].length; i++) {
        for (let y = 0; y < layers.length; y++) {
            const digit = layers[y][i];
            if (digit === 0 || digit === 1) {
                img.push(digit);
                break;
            }
        }
    }

    writeToFile(generateLayers(img, wide, tall)); // contains only 1 layer
};

const writeToFile = (img) => {
    fs.writeFile('output.txt', img, () => {
        console.log('success!');
    });
};

const generateLayers = (arr, wide, tall) => {
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

const sortArrByLeastZeros = (a, b) =>
    a.filter(o => o === 0).length - b.filter(o => o === 0).length;

module.exports = {
    partOne,
    partTwo
};