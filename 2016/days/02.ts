import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface ICoordinate {
  x: number;
  y: number;
}

class KeyPadSolver {
  keyPass: (number | string | null)[] = [];
  position: ICoordinate = {
    x: 1,
    y: 1,
  };

  constructor(
    public keyPad: (number | string | null)[][],
    public instructions: string[]
  ) {}

  solve(): void {
    this.instructions.forEach((instruction) => {
      instruction.split('').forEach((o) => {
        const newPosition = { ...this.position };

        switch (o) {
          case 'U':
            newPosition.y--;
            break;
          case 'R':
            newPosition.x++;
            break;
          case 'D':
            newPosition.y++;
            break;
          case 'L':
            newPosition.x--;
            break;
        }

        const { x, y } = newPosition;

        if (this.keyPad[y] && this.keyPad[y][x]) {
          this.position = { ...newPosition };
        }
      });

      this.keyPass.push(this.keyPad[this.position.y][this.position.x]);
    });
  }

  get password(): string {
    return this.keyPass.join('');
  }
}

export default (): void => {
  const instructions = getAsArray('02.txt');

  const keyPadSolver1 = new KeyPadSolver(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    instructions
  );

  keyPadSolver1.solve();
  success(`Part 1: ${keyPadSolver1.password}`);

  const keyPadSolver2 = new KeyPadSolver(
    [
      [null, null, 1, null, null],
      [null, 2, 3, 4, null],
      [5, 6, 7, 8, 9],
      [null, 'A', 'B', 'C', null],
      [null, null, 'D', null, null],
    ],
    instructions
  );

  keyPadSolver2.solve();
  success(`Part 2: ${keyPadSolver2.password}`);

  end();
};
