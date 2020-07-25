const chalk = require('chalk');
const logUpdate = require('log-update');
const { sleep } = require('../../utils/helper-functions');
const getInput = require('./input');

let tiles = {};
let score = 0;

const partOne = () => {
    const input = getInput();
    intCodeComp(input);
    const blockTiles = Object.values(tiles).flat().filter(o => o.id === 2);
    console.log('Number of block tiles: ', blockTiles.length);
    console.log('Program finished (part 1)');
};

const partTwo = async () => {
    const input = getInput(2);
    await intCodeComp(input);
    console.log('Score: ', score);
    console.log('Program finished (part 2)');
};

const intCodeComp = async (input) => {
    let outputSequence = 0;
    let tile = {};

    let terminate = false;
    let relativeBase = 0;

    for (let i = 0; i < input.length;) {
        const opt = input[i].toString();
        const operation = opt.length === 1
            ? `0${opt}`
            : opt.substr(-2);

        const param1 = input[i + 1];
        const param2 = input[i + 2];
        const param3 = input[i + 3];

        const [, , mode1 = 0, mode2 = 0, mode3 = 0] = [...opt].reverse();

        const val1 = mode1 == 0 ? input[param1] : mode1 == 1 ? param1 : input[param1 + relativeBase];
        const val2 = mode2 == 0 ? input[param2] : mode2 == 1 ? param2 : input[param2 + relativeBase];
        const val3 = mode3 == 0 ? param3 : param3 + relativeBase;

        switch (operation) {
            case '01':
                input[val3] = val1 + val2;
                i += 4;
                break;
            case '02':
                input[val3] = val1 * val2;
                i += 4;
                break;
            case '03':
                input[mode1 == 0 ? param1 : param1 + relativeBase] = getJoystickInput();
                i += 2;
                // await renderBoard(); // UNCOMMENT TO DRAW BOARD
                break;
            case '04':

                switch (++outputSequence) {
                    case 1:
                        tile.x = val1;
                        break;
                    case 2:
                        tile.y = val1;
                        break;
                    case 3:
                        tile.id = val1;
                        storeTile(tile);
                        tile = {};
                        outputSequence = 0;
                        break;
                    default:
                        console.log('Something went wrong (04)', outputSequence);
                        break;
                }

                i += 2;
                break;
            case '05':
                i = val1 != 0 ? val2 : i + 3;
                break;
            case '06':
                i = val1 == 0 ? val2 : i + 3;
                break;
            case '07':
                input[val3] = val1 < val2 ? 1 : 0;
                i += 4;
                break;
            case '08':
                input[val3] = val1 == val2 ? 1 : 0;
                i += 4;
                break;
            case '09':
                relativeBase += val1;
                i += 2;
                break;
            case '99':
                console.log('Finished execution');
                terminate = true;
                break;
            default:
                console.log('Something went wrong (default)', operation);
                terminate = true;
                break;
        }

        if (terminate) {
            break;
        }
    }

    console.log('Program finished');
};

const storeTile = (tile) => {
    if (tile.x === -1 && tile.y === 0) {
        score = tile.id;
        return;
    }

    const key = tiles.hasOwnProperty(tile.y);

    if (key) {
        const index = tiles[tile.y].findIndex(o => o.x === tile.x);

        if (index !== -1) {
            tiles[tile.y][index].id = tile.id;
            return;
        }

        tiles[tile.y].push({
            x: tile.x,
            id: tile.id
        });
    } else {
        tiles[tile.y] = [];
        tiles[tile.y].push({
            x: tile.x,
            id: tile.id
        })
    }
};

const renderBoard = async () => {
    let str = '';

    for (let [, values] of Object.entries(tiles)) {
        values.map(({ id }) => {
            switch (id) {
                case 0:
                    str += ' ';
                    break;
                case 1:
                    str += '.';
                    break;
                case 2:
                    str += chalk.redBright('x');
                    break;
                case 3:
                    str += chalk.white('_');
                    break;
                case 4:
                    str += chalk.greenBright('o');
                    break;
            }
        });
        str += '\n';
    }

    const scoreGUI = chalk.yellow(`\nScore: ${score}`);
    logUpdate(`${str}${scoreGUI}`);
    await sleep();
};

const getJoystickInput = () => {
    const flatTiles = Object.values(tiles).flat();
    const ball = flatTiles.find(o => o.id === 4);
    const paddle = flatTiles.find(o => o.id === 3);

    return Math.sign(ball.x - paddle.x);
};

module.exports = {
    partOne,
    partTwo
};