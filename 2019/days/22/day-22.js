const fs = require('fs');
const path = require('path');

const getPuzzleInput = () => fs
  .readFileSync(path.resolve(__dirname, 'puzzle-input.txt'))
  .toString()
  .split('\n')
  .map(o => o.replace('\r', ''));

const getDeck = () => [...Array(10007).keys()];
let deck = getDeck();

const partOne = () => {
  const puzzleInput = getPuzzleInput();

  for (let i = 0; len = puzzleInput.length, i < len; i++) {
    if (puzzleInput[i].includes('deal into new stack')) {
      dealIntoNewStack();
    } else if (puzzleInput[i].includes('cut')) {
      const val = parseInt(puzzleInput[i].replace('cut ', ''));
      if (val > 0) {
        cutNCards(val);
      } else {
        cutNCardsFromBottom(val);
      }
    } else if (puzzleInput[i].includes('deal with increment')) {
      const val = parseInt(puzzleInput[i].replace('deal with increment ', ''));
      dealWithIncrementN(val);
    } else {
      console.log('Something went wrong');
    }
  }

  console.log('Program finished', deck.findIndex(o => o === 2019));
};

const partTwo = () => { };

const dealIntoNewStack = () => {
  deck.reverse();
};

const cutNCards = (n) => {
  const cut = deck.splice(0, n);
  deck.push(...cut);
};

const cutNCardsFromBottom = (n) => {
  n = Math.abs(n);
  const cut = deck.reverse().splice(0, n);
  deck.push(...cut);
  deck.reverse();
};

const dealWithIncrementN = (n) => {
  const newDeck = getDeck();
  let index = 0;

  for (let i = 0; len = deck.length, i < len; i++) {
    newDeck[index] = deck[i];
    index += n;

    if (index > newDeck.length - 1) {
      index = index % newDeck.length;
    }
  }

  deck = [...newDeck];
};

module.exports = {
  partOne,
  partTwo
};

