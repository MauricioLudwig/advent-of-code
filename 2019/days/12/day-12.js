const input = [
    { x: 13, y: -13, z: -2 },
    { x: 16, y: 2, z: -15 },
    { x: 7, y: -18, z: -12 },
    { x: -3, y: -8, z: -8 }
];

const getMoons = () => input.map(o => ({
    pos: o,
    vel: { x: 0, y: 0, z: 0 }
}));

const day12 = () => {
    const timeSteps = 500000;
    let moons = getMoons();
    let cycleX, cycleY, cycleZ;

    for (let i = 1; i <= timeSteps; i++) {
        let tempInput = JSON.parse(JSON.stringify(moons)).map(o => o.pos); // deep clone
        for (let u = 0; u < moons.length; u++) {
            ['x', 'y', 'z'].map(key => {
                let velSum = 0;
                tempInput.map((o, index) => {
                    if (index === u) {
                        return;
                    }

                    if (o[key] > tempInput[u][key]) {
                        moons[u].pos[key]++;
                        velSum++;
                    }

                    if (o[key] < tempInput[u][key]) {
                        moons[u].pos[key]--;
                        velSum--;
                    }
                });
                moons[u].pos[key] += moons[u].vel[key];
                moons[u].vel[key] += velSum;
            });
        }
        if (!cycleX && moons.every(({ pos, vel }, i) => pos.x === [13, 16, 7, -3][i] && vel.x === 0)) { // initial x position
            cycleX = i;
        }
        if (!cycleY && moons.every(({ pos, vel }, i) => pos.y === [-13, 2, -18, -8][i] && vel.y === 0)) { // initial y position
            cycleY = i;
        }
        if (!cycleZ && moons.every(({ pos, vel }, i) => pos.z === [-2, -15, -12, -8][i] && vel.z === 0)) { // initial z position
            cycleZ = i;
        }

        if (cycleX && cycleY && cycleZ) {
            break;
        }
    }

    const firstStateSteps = getLCM([cycleX, cycleY, cycleZ]);

    const energySum = moons.reduce((a, b) => {
        return a + calculateAbsValue(b.pos) * calculateAbsValue(b.vel);
    }, 0);

    console.log('moons', moons);
    console.log('energySum', energySum);
    console.log('firstStateSteps', firstStateSteps);
};

const getLCM = (numbers) => {
    let n = 1;

    for (let i = 0; i < numbers.length; i++) {
        n = getLCM2(numbers[i], n);
    }

    return n;
};

const getLCM2 = (a, b) => {
    return a * b / GCD2(a, b);
};

const GCD2 = (a, b) => {
    if (!b) {
        return b === 0 ? a : NaN;
    }

    return GCD2(b, a % b);
};

const calculateAbsValue = ({ x, y, z }) => Math.abs(x) + Math.abs(y) + Math.abs(z);

module.exports = {
    day12
};