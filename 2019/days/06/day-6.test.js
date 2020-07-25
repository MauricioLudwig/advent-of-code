const { partOne, partTwo } = require('./day-6');

test('day 6, part 1', () => {
    expect(partOne('input-test-1.txt')).toEqual(42);
});

test('day 6, part 2', () => {
    expect(partTwo('input-test-2.txt')).toEqual(4);
});