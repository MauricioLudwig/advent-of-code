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

const partOne = () => {
    const timeSteps = 1000;
    let moons = getMoons();

    for (let i = 0; i < timeSteps; i++) {
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
    }

    const energySum = moons.reduce((a, b) => {
        return a + calculateAbsValue(b.pos) * calculateAbsValue(b.vel);
    }, 0);

    console.log('moons', moons);
    console.log('energySum', energySum);
};

const calculateAbsValue = ({ x, y, z }) => Math.abs(x) + Math.abs(y) + Math.abs(z);

module.exports = {
    partOne
};