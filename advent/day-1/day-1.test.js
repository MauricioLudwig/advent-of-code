const fuelRequirement = require('./day-1');

test('Should correctly calculate sum of fuel for numbers test file', () => {
    expect(fuelRequirement).toEqual(34273);
});