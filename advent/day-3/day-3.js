const { wireOne, wireTwo } = require('./input');

const partOne = (x = wireOne, y = wireTwo) => {
    const trajectoryOne = calculateTrajectory(parseInput(x));
    const trajectoryTwo = calculateTrajectory(parseInput(y));
    const trajOneLength = trajectoryOne.length;
    const trajTwoLength = trajectoryTwo.length;
    let matches = [];

    for (let i = 0; i < trajOneLength; i++) {
        for (let y = 0; y < trajTwoLength; y++) {
            const { x: x1, y: y1 } = trajectoryOne[i];
            const { x: x2, y: y2 } = trajectoryTwo[y];
            if (x1 === x2 && y1 === y2) {
                matches.push(Math.abs(x1) + Math.abs(y1));
            }
        }
    }

    return matches.sort((a, b) => a - b)[0];
};

const partTwo = (x = wireOne, y = wireTwo) => {
    const trajectoryOne = calculateTrajectory(parseInput(x));
    const trajectoryTwo = calculateTrajectory(parseInput(y));
    const trajOneLength = trajectoryOne.length;
    const trajTwoLength = trajectoryTwo.length;
    let stepMatches = [];

    for (let i = 0; i < trajOneLength; i++) {
        for (let y = 0; y < trajTwoLength; y++) {
            const { x: x1, y: y1 } = trajectoryOne[i];
            const { x: x2, y: y2 } = trajectoryTwo[y];
            if (x1 === x2 && y1 === y2) {
                const arr1 = trajectoryOne.slice(0, i + 1); // including intersection
                const arr2 = trajectoryTwo.slice(0, y + 1); // including intersection
                stepMatches.push(arr1.length + arr2.length);
            }
        }
    }

    return stepMatches.sort((a, b) => a - b)[0];
};

const parseInput = str => str.split(',');

const calculateTrajectory = (wire) => {
    let arr = [];
    let earlyTerminate = false;
    const wireLength = wire.length;
    let coordinates = {
        x: 0,
        y: 0
    };

    for (let i = 0; i < wireLength; i++) {
        const direction = wire[i][0];
        const value = parseInt(wire[i].slice(1));

        switch (direction) {
            case 'U': // (+)y
                for (let z = 0; z < value; z++) {
                    arr.push({
                        ...coordinates,
                        y: coordinates.y + z + 1
                    });
                }
                coordinates.y += value;
                break;
            case 'R': // (+)x
                for (let z = 0; z < value; z++) {
                    arr.push({
                        ...coordinates,
                        x: coordinates.x + z + 1
                    });
                }
                coordinates.x += value;
                break;
            case 'D': // (-)y
                for (let z = 0; z < value; z++) {
                    arr.push({
                        ...coordinates,
                        y: coordinates.y - z - 1
                    })
                }
                coordinates.y -= value;
                break;
            case 'L': // (-)x
                for (let z = 0; z < value; z++) {
                    arr.push({
                        ...coordinates,
                        x: coordinates.x - z - 1
                    })
                }
                coordinates.x -= value;
                break;
            default:
                console.log('Something went wrong', direction);
                earlyTerminate = true;
                break;
        }

        if (earlyTerminate) {
            arr = [];
            break;
        }
    }

    return arr;
};

module.exports = {
    partOne,
    partTwo,
    calculateTrajectory
};