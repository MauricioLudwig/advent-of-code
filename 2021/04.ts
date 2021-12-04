import { TDayFn } from '../@@types';
import { Divisor, Input, Logger } from '../@@utils';

type TBoard = string[][];

export default async (): TDayFn => {
  const input = new Input('./2021/files/04.txt').AsMatrix(Divisor.NewLine);
  const [s1, ...s2] = input;

  const numbers = s1![0]?.split(',')!;
  const boards = s2!.map((o) =>
    o.map((x) => x.split(' ').filter((y) => y !== ''))
  );

  let stop = false;

  for (let i = 0; i < numbers?.length; i++) {
    const drawnNumbers = numbers.slice(0, i + 1);

    for (let b = 0; b < boards.length; b++) {
      const board = boards[b]!;
      const number = parseInt(numbers[i]!, 10);

      const [hasRowMatch, winningRow] = findRowMatch(board, drawnNumbers);

      if (hasRowMatch) {
        printWinningBoard(board, number);
      }

      const [hasColMatch, winningColumn] = findColumnMatch(board, drawnNumbers);

      if (hasColMatch) {
        printWinningBoard(board, number);
      }

      // Part 1
      if (hasRowMatch || hasColMatch) {
        const unmarkedNumbersSum = board
          .flat()
          .filter((o) => !drawnNumbers.includes(o))
          .reduce((acc, curr) => acc + parseInt(curr, 10), 0);

        Logger.success(`Part 1: ${number * unmarkedNumbersSum}`);

        stop = true;
        break;
      }
    }

    if (stop) {
      break;
    }
  }
};

const printWinningBoard = (board: TBoard, winningNumber: number): void => {
  console.log(`Winning number: ${winningNumber}`, board);
};

const findRowMatch = (
  board: TBoard,
  numbers: string[]
): [boolean, string[]] => {
  let winningRow: string[] = [];

  const hasMatch = board.some((row) => {
    const match = row.every((col) => numbers.includes(col));

    if (match) {
      winningRow = Array.from(row);
    }

    return match;
  });

  return [hasMatch, winningRow];
};

const findColumnMatch = (
  board: TBoard,
  numbers: string[]
): [boolean, string[]] => {
  let winningColumn: string[] = [];
  let hasMatch = false;

  for (let i = 0; i < board.length; i++) {
    let match = true;
    let col: string[] = [];

    for (let y = 0; y < board[i]!.length; y++) {
      const number = board[y]![i]!;

      if (!numbers.includes(number)) {
        match = false;
        break;
      }

      col.push(number);
    }

    if (match) {
      hasMatch = true;
      winningColumn = Array.from(col);
    }
  }

  return [hasMatch, winningColumn];
};
