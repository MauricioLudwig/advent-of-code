const getNumbers = require('./numbers');

const partOne = (numArr = getNumbers()) => {
    const numArrLength = numArr.length;

    for (let i = 0; i < numArrLength; i += 4) {
        const posOne = numArr[i + 1];
        const posTwo = numArr[i + 2];
        const posThree = numArr[i + 3];

        const valOne = numArr[posOne];
        const valTwo = numArr[posTwo];
        let terminate = false;

        switch (numArr[i]) {
            case 1:
                numArr[posThree] = valOne + valTwo;
                break;
            case 2:
                numArr[posThree] = valOne * valTwo;
                break;
            case 99:
                terminate = true;
                break;
            default:
                numArr = null;
                terminate = true;
                break;
        }

        if (terminate) {
            break;
        }
    }

    return numArr;
};

const partTwo = () => {
    let terminate = false;

    for (let i = 0; i < 100; i++) {
        for (let y = 0; y < 100; y++) {
            const parsedOpt = partOne(getNumbers(i, y));

            if (parsedOpt[0] === 19690720) {
                console.log('noun, verb', i, y);
                terminate = true;
                break;
            }
        }

        if (terminate) {
            break;
        }
    }
};

module.exports = {
    partOne,
    partTwo
};