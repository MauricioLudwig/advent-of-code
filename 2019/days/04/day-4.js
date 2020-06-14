const RANGE = {
    START: 246515,
    END: 739105
};

const day4 = () => {
    let matches = 0;

    for (let i = RANGE.START; i <= RANGE.END; i++) {
        const numArr = i.toString().split('').map(Number);
        const sortedNumArr = [...numArr].sort();
        const uniqueNumArr = Array.from(new Set([...numArr]));

        const ascendingNumber = checkArrayEquality(numArr, sortedNumArr);
        const adjacentDuplicate = checkDuplicateDouble(uniqueNumArr, numArr);

        if (ascendingNumber && adjacentDuplicate) {
            matches++;
        }
    }

    return matches;
};

const checkDuplicateDouble = (unique, arr) => {
    let isDuplicateDouble = false;

    for (let i = 0; i < unique.length; i++) {
        const duplicates = arr.filter(o => o === unique[i]);

        if (duplicates.length === 2) {
            isDuplicateDouble = true;
            break;
        }
    }

    return isDuplicateDouble;
};

const checkArrayEquality = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    let duplicateAdjacent = false;
    let equal = true;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            equal = false;
            break;
        }
    }

    return equal;
};

module.exports = day4;