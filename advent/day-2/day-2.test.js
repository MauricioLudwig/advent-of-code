const { partOne } = require('./day-2');

test('[1,9,10,3,2,3,11,0,99,30,40,50]', () => {
    expect(partOne([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])).toEqual(expect.arrayContaining([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]));
});

test('[1,0,0,0,99]', () => {
    expect(partOne([1, 0, 0, 0, 99])).toEqual(expect.arrayContaining([2, 0, 0, 0, 99]));
});

test('[2,3,0,3,99]', () => {
    expect(partOne([2, 3, 0, 3, 99])).toEqual(expect.arrayContaining([2, 3, 0, 6, 99]));
});

test('[2,4,4,5,99,0]', () => {
    expect(partOne([2, 4, 4, 5, 99, 0])).toEqual(expect.arrayContaining([2, 4, 4, 5, 99, 9801]));
});

test('[1,1,1,4,99,5,6,0,99]', () => {
    expect(partOne([1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual(expect.arrayContaining([30, 1, 1, 4, 2, 5, 6, 0, 99]));
});
