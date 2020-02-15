const { done, success } = require('../utils/console-logger');
const fs = require('fs');
const path = require('path');

const getPuzzleInput = () => fs
  .readFileSync(path.resolve(__dirname, 'puzzle-input.txt'))
  .toString()
  .split('\n')
  .map(o => o.replace('\r', '').split(''));

const partOne = () => {
  let input = getPuzzleInput();
  const gridSize = 5;
  let layouts = [];

  while (true) {
    let newInput = JSON.parse(JSON.stringify(input));

    for (let i = 0; i < gridSize; i++) {
      for (let y = 0; y < gridSize; y++) {
        const nrOfBugs = checkAdjacentTiles(input, i, y, gridSize).filter(o => o === '#').length;
        if (input[i][y] === '.' && (nrOfBugs === 1 || nrOfBugs === 2)) {
          newInput[i][y] = '#';
        } else if (input[i][y] === '#' && nrOfBugs !== 1) {
          newInput[i][y] = '.';
        }
      }
    }

    const newLayout = newInput.flat().join('');
    if (layouts.some(o => o === newLayout)) {
      console.log('Found match!', newInput, calculateBioDiversityRating(newLayout));
      break;
    };

    layouts.push(newLayout);
    input = JSON.parse(JSON.stringify(newInput));
  }

  done('Program finished', 'Part 1');
};

const checkAdjacentTiles = (arr, i, y, gridSize) => {
  let tiles = [];

  // UP
  tiles.push(i === 0 ? '.' : arr[i - 1][y]);

  // DOWN
  tiles.push(i === gridSize - 1 ? '.' : arr[i + 1][y]);

  // LEFT
  tiles.push(y === 0 ? '.' : arr[i][y - 1]);

  // RIGHT
  tiles.push(y === gridSize - 1 ? '.' : arr[i][y + 1]);

  return tiles;
};

const calculateBioDiversityRating = (layout) => layout.split('').reduce((acc, current, index) => {
  if (current === '#') {
    return acc + Math.pow(2, index);
  }
  return acc;
}, 0);

const partTwo = () => {
  const origin = 0;
  const levels = 200;
  const minutes = 200;

  let foldedSpace = {
    [origin]: getPuzzleInput()
  };

  for (let i = 1; i <= levels; i++) {
    foldedSpace[origin + i] = getEmptyMatrix(); // LEVEL ABOVE (+1)
    foldedSpace[origin - i] = getEmptyMatrix(); // LEVEL BELOW (-1)
  }

  for (let i = 0; i < minutes; i++) {
    const cachedFoldedSpace = JSON.parse(JSON.stringify(foldedSpace));
    for (let i = -Math.abs(levels); i <= levels; i++) {
      calculateBugGrowth(foldedSpace, cachedFoldedSpace, i);
    }
  }

  success(`Number of bugs present after ${minutes} minutes`, 'Part 2', calculateNumberOfBugs(foldedSpace));
  done('Program finished', 'Part 2');
};

const getEmptyMatrix = () => {
  let grid = [];
  const gridSize = 5;

  for (let i = 0; i < gridSize; i++) {
    let row = [];
    for (let y = 0; y < gridSize; y++) {
      row.push('.');
    }
    grid.push(row);
  }

  return grid;
};

const calculateNumberOfBugs = space => Object
  .values(space)
  .flat(Infinity)
  .filter(o => o === '#')
  .length;

const calculateBugGrowth = (space, cachedSpace, index) => {
  const gridSize = 5;
  const plane = space[index];
  const cachedPlane = cachedSpace[index];
  const cachedPlaneUp = cachedSpace[index + 1];
  const cachedPlaneDown = cachedSpace[index - 1];

  for (let i = 0; i < gridSize; i++) {
    for (let y = 0; y < gridSize; y++) {
      if (i === 2 && y === 2) {
        continue;
      }

      let tiles = [];

      const tile8 = cachedPlaneUp ? cachedPlaneUp[1][2] : '.';
      const tile12 = cachedPlaneUp ? cachedPlaneUp[2][1] : '.';
      const tile14 = cachedPlaneUp ? cachedPlaneUp[2][3] : '.';
      const tile18 = cachedPlaneUp ? cachedPlaneUp[3][2] : '.';

      const tileAE = cachedPlaneDown ? getRowValues(cachedPlaneDown, 0) : '.';
      const tileAU = cachedPlaneDown ? getColumnValues(cachedPlaneDown, 0) : '.';
      const tileEY = cachedPlaneDown ? getColumnValues(cachedPlaneDown, gridSize - 1) : '.';
      const tileUY = cachedPlaneDown ? getRowValues(cachedPlaneDown, gridSize - 1) : '.';

      // UP
      if (i === 0) {
        tiles.push(tile8)
      } else if (i === 3 && y === 2) {
        tiles.push(tileUY);
      } else {
        tiles.push(cachedPlane[i - 1][y]);
      }

      // LEFT
      if (y === 0) {
        tiles.push(tile12);
      } else if (i === 2 && y === 3) {
        tiles.push(tileEY);
      } else {
        tiles.push(cachedPlane[i][y - 1]);
      }

      // RIGHT
      if (y === gridSize - 1) {
        tiles.push(tile14);
      } else if (i === 2 && y === 1) {
        tiles.push(tileAU);
      } else {
        tiles.push(cachedPlane[i][y + 1]);
      }

      // DOWN
      if (i === gridSize - 1) {
        tiles.push(tile18);
      } else if (i === 1 && y === 2) {
        tiles.push(tileAE);
      } else {
        tiles.push(cachedPlane[i + 1][y]);
      }

      const nrOfBugs = tiles.flat(Infinity).filter(o => o === '#').length;

      if (cachedPlane[i][y] === '.' && (nrOfBugs === 1 || nrOfBugs === 2)) {
        plane[i][y] = '#';
      } else if (cachedPlane[i][y] === '#' && nrOfBugs !== 1) {
        plane[i][y] = '.';
      }
    }
  }
};

const getRowValues = (arr, n) => arr[n];
const getColumnValues = (arr, n) => arr.map(o => o[n]);

module.exports = {
  partOne,
  partTwo
};
