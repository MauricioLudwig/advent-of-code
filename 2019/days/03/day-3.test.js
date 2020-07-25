const { partOne, partTwo } = require('./day-3');

test('day 3, part 1, fixture 1', () => {
    const arrange = partOne(
        'R8,U5,L5,D3',
        'U7,R6,D4,L4'
    );

    expect(arrange).toEqual(6);
});

test('day 3, part 1, fixture 2', () => {
    const arrange = partOne(
        'R75,D30,R83,U83,L12,D49,R71,U7,L72',
        'U62,R66,U55,R34,D71,R55,D58,R83'
    );

    expect(arrange).toEqual(159);
});

test('day 3, part 1, fixture 3', () => {
    const arrange = partOne(
        'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
        'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    );

    expect(arrange).toEqual(135);
});

test('day 3, part 2, fixture 1', () => {
    const arrange = partTwo(
        'R8,U5,L5,D3',
        'U7,R6,D4,L4'
    );

    expect(arrange).toEqual(30);
});


test('day 3, part 2, fixture 2', () => {
    const arrange = partTwo(
        'R75,D30,R83,U83,L12,D49,R71,U7,L72',
        'U62,R66,U55,R34,D71,R55,D58,R83'
    );

    expect(arrange).toEqual(610);
});

test('day 3, part 2, fixture 3', () => {
    const arrange = partTwo(
        'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
        'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    );

    expect(arrange).toEqual(410);
});