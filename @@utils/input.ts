import fs from 'fs';

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
}
