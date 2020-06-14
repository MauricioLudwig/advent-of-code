import fs from 'fs';
import path from 'path';

const getFilePath = fileName => path.resolve(`./input/files/${fileName}`);

export const getAsArray = fileName => fs
  .readFileSync(getFilePath(fileName))
  .toString()
  .split('\n')
  .map(o => o.replace('\r', ''));

export const getAsNumbersArray = fileName => fs
  .readFileSync(getFilePath(fileName))
  .toString()
  .split('\n')
  .map(Number);
