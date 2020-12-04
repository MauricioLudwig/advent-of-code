import fs from 'fs';
import path from 'path';

const getFilePath = (fileName: string): string =>
  path.resolve(`./input/files/${fileName}`);

export const getAsSingleLine = (fileName: string): string =>
  fs.readFileSync(getFilePath(fileName)).toString();

export const getAsArray = (fileName: string): string[] =>
  fs
    .readFileSync(getFilePath(fileName))
    .toString()
    .split('\n')
    .map((o): string => o.replace('\r', ''));

export const getAsNumbersArray = (fileName: string): number[] =>
  fs.readFileSync(getFilePath(fileName)).toString().split('\n').map(Number);

export const getAsMatrix = (fileName: string, divider: string): string[][] => {
  const allLines = getAsArray(fileName);
  const matrix: string[][] = [];
  let group: string[] = [];

  while (true) {
    const line = allLines.shift();

    if (line === divider || line === undefined) {
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
};
