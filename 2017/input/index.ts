import fs from 'fs';
import path from 'path';

const getFilePath = (fileName: string): string =>
  path.resolve(`./input/files/${fileName}`);

export const getAsSingleLine = (fileName: string): string =>
  fs.readFileSync(getFilePath(fileName)).toString();
