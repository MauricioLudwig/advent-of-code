import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const seatLayout = getAsArray('11.txt').map((o) => o.split(''));

  const seatingSystem1 = new SeatingSystem(seatLayout);
  seatingSystem1.run(4, false);
  success(`Part 1: ${seatingSystem1.numberOfOccupiedSeats}`);

  const seatingSystem2 = new SeatingSystem(seatLayout);
  seatingSystem2.run(5, true);
  success(`Part 2: ${seatingSystem2.numberOfOccupiedSeats}`);
};

class SeatingSystem {
  layout: string[][] = [];
  pastLayouts: string[] = [];
  iterations = 0;

  constructor(layout: string[][]) {
    this.layout = [...layout].map((o) => [...o]);
  }

  run(maxOccupiedSeatsThreshold: number, loopCheck: boolean): void {
    while (true) {
      const original = this.getLayoutCopy();

      for (let y = 0; y < original.length; y++) {
        for (let x = 0; x < original[y].length; x++) {
          const newSeat = this.checkAdjacentSeats(
            original,
            x,
            y,
            maxOccupiedSeatsThreshold,
            loopCheck
          );

          if (newSeat) {
            this.layout[y][x] = newSeat;
          }
        }
      }

      this.iterations++;

      if (this.reachedEquilibrium()) {
        break;
      } else {
        this.pastLayouts.push(this.layout.flat().join(''));
      }
    }
  }

  private checkAdjacentSeats(
    seatLayout: string[][],
    x: number,
    y: number,
    maxOccupiedSeatsThreshold: number,
    loopCheck: boolean
  ): string | null {
    const currentSeat = seatLayout[y][x];
    const numberOfOccupiedSeats = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ].reduce((acc, [xOffset, yOffset]) => {
      const seat = this.checkSeat(
        seatLayout,
        x,
        y,
        xOffset,
        yOffset,
        loopCheck
      );

      if (seat && seat === '#') {
        return acc + 1;
      }

      return acc;
    }, 0);

    if (currentSeat === 'L' && numberOfOccupiedSeats === 0) {
      return '#';
    } else if (
      currentSeat === '#' &&
      numberOfOccupiedSeats >= maxOccupiedSeatsThreshold
    ) {
      return 'L';
    } else {
      return null;
    }
  }

  private checkSeat(
    seatLayout: string[][],
    xOrigin: number,
    yOrigin: number,
    xOffset: number,
    yOffset: number,
    loopCheck: boolean
  ): string | null {
    let value: string | null = null;
    let x = xOrigin + xOffset;
    let y = yOrigin + yOffset;

    do {
      const seatY = seatLayout[y];

      if (!seatY) {
        break;
      }

      const seatX = seatY[x];

      if (!seatX) {
        break;
      } else if (['#', 'L'].includes(seatX)) {
        value = seatX;
        break;
      }

      x += xOffset;
      y += yOffset;
    } while (loopCheck);

    return value;
  }

  private reachedEquilibrium(): boolean {
    return this.pastLayouts.includes(this.layout.flat().join(''));
  }

  private getLayoutCopy(): string[][] {
    return [...this.layout].map((o) => [...o]);
  }

  get numberOfOccupiedSeats(): number {
    return this.layout.flat().filter((o) => o === '#').length;
  }
}
