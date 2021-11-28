import fs from 'fs';

export enum Divisor {
  NewLine = '',
}

export class Input {
  constructor(public fileName: string) {}

  get asSingleLine(): string {
    return fs.readFileSync(this.fileName).toString();
  }

  get asArray(): string[] {
    return fs
      .readFileSync(this.fileName)
      .toString()
      .split('\n')
      .map((o): string => o.replace('\r', ''));
  }

  get asNumbersArray(): number[] {
    return fs.readFileSync(this.fileName).toString().split('\n').map(Number);
  }

  AsMatrix(divisor: Divisor): string[][] {
    const allLines = this.asArray;
    const matrix: string[][] = [];
    let group: string[] = [];

    while (true) {
      const line = allLines.shift();

      if (line === divisor || line === undefined) {
        matrix.push([...group]);
        group = [];

        if (line === undefined) {
          break;
        }
      } else {
        group.push(line);
      }
    }

    return [...matrix.map((m) => [...m])];
  }
}
