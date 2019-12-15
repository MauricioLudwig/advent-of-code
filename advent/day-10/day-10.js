const fs = require('fs');
const path = require('path');

const ASTERIOD = '#';

const parseInput = () => fs
    .readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .map(o => o.replace('\r', '').split(''));

const partOne = () => {
    const space = parseInput();
    let location = { max: 0, x: null, y: null };

    for (let y = 0; y < space.length; y++) {
        for (let x = 0; x < space[y].length; x++) {
            if (space[y][x] === ASTERIOD) {
                const count = traverseSpace({ x1: x, y1: y }, space);
                if (count > location.max) {
                    location = { max: count, x, y };
                }
            }
        }
    }

    console.log('location', location);
    return location.max;
};

const partTwo = () => {
    const space = parseInput();
    let destroyedAsteroids = [];

    const x1 = 25;
    const y1 = 31;
    const x0 = x1;
    const y0 = 0;

    while (destroyedAsteroids.length < 200) {
        let asteroids = {};
        let upper = true;

        for (let y = y0; y < space.length; y++) {
            for (let x = x0; x < space[y].length; x++) {
                if (space[y][x] === ASTERIOD && !(y === y1 && x === x1)) {
                    const k = Math.abs(calcCoefficient({ x1, y1 }, { x, y }));
                    if (k.toString() in asteroids) {
                        asteroids[k].push({ x, y });
                    } else {
                        asteroids[k] = [];
                        asteroids[k].push({ x, y });
                    }
                }

                if (y === y1 && x === x1 && upper) {
                    destroyAsteroidsInverse(asteroids, destroyedAsteroids, space);
                    asteroids = {};
                    upper = false;
                }
            }
        }

        destroyAsteroids(asteroids, destroyedAsteroids, space);
        asteroids = {};
        upper = true;

        for (let y = space.length - 1; y > -1; y--) {
            for (let x = x0 - 1; x > -1; x--) {
                if (y === y1 && x + 1 === x1 && upper) {
                    destroyAsteroidsInverse(asteroids, destroyedAsteroids, space);
                    asteroids = {};
                    upper = false;
                }

                if (space[y][x] === ASTERIOD && !(y === y1 && x === x1)) {
                    const k = Math.abs(calcCoefficient({ x1, y1 }, { x, y }));
                    if (k.toString() in asteroids) {
                        asteroids[k].push({ x, y });
                    } else {
                        asteroids[k] = [];
                        asteroids[k].push({ x, y });
                    }
                }
            }
        }

        destroyAsteroids(asteroids, destroyedAsteroids, space);
    }

    console.log('destroyedAsteroids', destroyedAsteroids);
    return destroyedAsteroids[199];
};

const traverseSpace = ({ x1, y1 }, space) => {
    let visibleAsteroids = 0;
    let asteroids = {};
    let upper = true;

    for (let y = 0; y < space.length; y++) {
        for (let x = 0; x < space[y].length; x++) {
            if (space[y][x] === ASTERIOD && !(y === y1 && x === x1)) {
                asteroids[`${calcCoefficient({ x1, y1 }, { x, y })}`] = { x, y };
            }

            if (y === y1 && x === x1 && upper) {
                visibleAsteroids += Object.keys(asteroids).length;
                asteroids = {};
                upper = false;
            }
        }
    }

    visibleAsteroids += Object.keys(asteroids).length;
    return visibleAsteroids;
};

const calcCoefficient = ({ x1, y1 }, { x, y }) => (y - y1) / (x - x1);

const destroyAsteroids = (asteroids, destroyedAsteroids, space) => {
    Object.keys(asteroids)
        .sort((a, b) => a - b)
        .forEach(o => {
            const { x, y } = asteroids[o][0];
            destroyedAsteroids.push({ x, y });
            space[y][x] = '.';
        });
};

const destroyAsteroidsInverse = (asteroids, destroyedAsteroids, space) => {
    Object.keys(asteroids)
        .sort((a, b) => b - a)
        .forEach(o => {
            const { x, y } = asteroids[o].reverse()[0];
            destroyedAsteroids.push({ x, y });
            space[y][x] = '.';
        });
};

module.exports = {
    partOne,
    partTwo
};