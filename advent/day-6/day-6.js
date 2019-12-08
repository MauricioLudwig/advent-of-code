const fs = require('fs');
const path = require('path');

const getInput = (fileName = 'input.txt') => fs
    .readFileSync(path.resolve(__dirname, fileName))
    .toString()
    .split('\n')
    .map(o => o.replace('\r', '').split(')'));

const partOne = (fileName) => {
    const orbitMap = getInput(fileName);
    let currentOrbit = undefined;
    let iteration = 1;
    let numberOfOrbits = 0;

    while (true) {
        const directOrbits = findOrbits(currentOrbit, orbitMap);

        if (directOrbits.length === 0) {
            break;
        }

        numberOfOrbits += iteration * directOrbits.length;
        currentOrbit = directOrbits;
        iteration++;
    }

    return numberOfOrbits;
};

const partTwo = (fileName) => {
    const orbitMap = getInput(fileName);
    let youPath = trackReversePath('YOU', orbitMap);
    let sanPath = trackReversePath('SAN', orbitMap);
    const intersection = youPath.find(o => sanPath.some(x => x === o));
    youPath.splice(youPath.indexOf(intersection));
    sanPath.splice(sanPath.indexOf(intersection));
    return youPath.length + sanPath.length;
};

const findOrbits = (orbits = ['COM'], map) =>
    map.filter(o => orbits.some(x => x === o[0])).map(z => z[1]);

const findOrbitReverse = (orbit, map) => map.find(o => o[1] === orbit)[0];

const trackReversePath = (orbit, map) => {
    let path = [];
    let currentOrbit = orbit;

    while (true) {
        const orbit = findOrbitReverse(currentOrbit, map);

        if (orbit === 'COM') {
            break;
        }

        path.push(orbit);
        currentOrbit = orbit;
    }

    return path;
};

module.exports = {
    partOne,
    partTwo
};