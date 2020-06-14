const { partOne, partTwo } = require('./day-1');

test('Should correctly calculate sum of fuel for part one', () => {
    expect(partOne()).toEqual(34241);
});

test('Should correctly calculate sum of fuel for part two', () => {
    expect(partTwo()).toEqual(51316);
});
