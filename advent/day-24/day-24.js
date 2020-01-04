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

  console.log('Program finished');
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

module.exports = {
  partOne
};