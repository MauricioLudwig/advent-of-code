export enum Cube {
  Active = '#',
  Inactive = '.',
}

export type TCoordinate = {
  x: number;
  y: number;
  z: number;
};

export class Space {
  space: string[][][] = [];

  constructor(plane: string[][]) {
    const initialPlane = this.deepClonePlane(plane);
    this.generateEdgeCubes(initialPlane);
    this.space.push(initialPlane);
    this.space.unshift(
      this.deepClonePlane(this.generateEmptyPlane(initialPlane.length))
    );
    this.space.push(
      this.deepClonePlane(this.generateEmptyPlane(initialPlane.length))
    );
  }

  simulateCycle(): void {
    const originalSpace = [...this.space.map(this.deepClonePlane)];

    for (let z = 0; z < originalSpace.length; z++) {
      for (let y = 0, yLen = originalSpace[z].length; y < yLen; y++) {
        for (let x = 0, xLen = originalSpace[x].length; x < xLen; x++) {
          const activeNeighbors = this.getActiveNeighbors(originalSpace, {
            x,
            y,
            z,
          });

          if (originalSpace[z][y][x] === Cube.Active) {
            if (![2, 3].some((o) => o === activeNeighbors)) {
              this.space[z][y][x] = Cube.Inactive;
            }
          } else {
            if (activeNeighbors === 3) {
              this.space[z][y][x] = Cube.Active;
            }
          }
        }
      }
    }

    this.space.forEach((plane) => {
      this.generateEdgeCubes(plane);
    });
    const newSize = this.space[0].length;
    this.space.unshift(this.deepClonePlane(this.generateEmptyPlane(newSize)));
    this.space.push(this.deepClonePlane(this.generateEmptyPlane(newSize)));
  }

  private getActiveNeighbors(
    space: string[][][],
    coordinate: TCoordinate
  ): number {
    const activeNeighbors = [
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, 1],
      [0, 0],
      [0, -1],
      [1, 1],
      [1, 0],
      [1, -1],
    ].reduce((acc, [zOffset, yOffset]) => {
      const y = coordinate.y + yOffset;
      const z = coordinate.z + zOffset;
      let active = 0;

      if (
        space[z] &&
        space[z][y] &&
        space[z][y][coordinate.x - 1] === Cube.Active
      ) {
        active++;
      }

      if (
        space[z] &&
        space[z][y] &&
        space[z][y][coordinate.x + 1] === Cube.Active
      ) {
        active++;
      }

      if (
        space[z] &&
        space[z][y] &&
        space[z][y][coordinate.x] === Cube.Active
      ) {
        if (!(zOffset === 0 && yOffset === 0)) {
          active++;
        }
      }

      return acc + active;
    }, 0);

    return activeNeighbors;
  }

  print(): void {
    this.space.forEach((plane, i) => {
      let string = `z = ${i}\n`;

      plane.forEach((coordinate) => {
        string += [...coordinate].join('') + '\n';
      });

      console.log(string);
    });
  }

  printPlane(z: number): void {
    let string = `z = ${z}\n`;

    this.space[z].forEach((plane) => {
      plane.forEach((coordinate) => {
        string += coordinate;
      });

      string += '\n';
    });

    console.log(string);
  }

  get activeCubes(): number {
    return this.space.flat(Infinity).filter((o) => o === Cube.Active).length;
  }

  private generateEdgeCubes(plane: string[][]): void {
    plane.forEach((o) => {
      o.unshift(Cube.Inactive);
      o.push(Cube.Inactive);
    });

    const size = plane[0].length;

    plane.unshift([...Array(size).fill(Cube.Inactive)]);
    plane.push([...Array(size).fill(Cube.Inactive)]);
  }

  private generateEmptyPlane(size: number): string[][] {
    return Array(size)
      .fill(0)
      .map(() => [...Array(size).fill(Cube.Inactive)]);
  }

  private deepClonePlane(plane: string[][]): string[][] {
    return [...plane.map((o) => [...o])];
  }
}
