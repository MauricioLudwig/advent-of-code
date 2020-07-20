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
    .map((o) => o.replace('\r', ''));
