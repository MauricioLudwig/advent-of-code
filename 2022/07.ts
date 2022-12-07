import { Input, Logger } from "../@@utils";

const patterns = {
  path: /(dir|cd) ([\w\.\/]+)/,
  file: /(\d+) ([A-Za-z\.]+)/,
  ls: /ls/,
};

type Command = {
  type: string;
  folder?: string;
  fileName?: string;
  fileSize?: number;
};

export default async () => {
  const input: Array<Command> = new Input("./2022/files/07.txt").asArray.map(
    (o) => {
      switch (true) {
        case patterns.path.test(o):
          const [, type = "", folder = ""] = o.match(patterns.path) ?? [];
          return {
            type,
            folder,
          };
        case patterns.file.test(o):
          const [, fileSize = "", fileName = ""] = o.match(patterns.file) ?? [];
          return {
            type: "file",
            fileName,
            fileSize: parseInt(fileSize, 10),
          };
        case patterns.ls.test(o):
          return {
            type: "ls",
          };
        default:
          throw new Error(`Could not match any cases for ${o}`);
      }
    }
  );

  const fileSystem: Record<string, any> = {};
  const queue: Array<string> = [];

  input.forEach(({ type, folder = "", fileName = "", fileSize }) => {
    const subDir = getDir(fileSystem, [...queue]);

    switch (type) {
      case "cd":
        if (folder === "..") {
          queue.pop();
        } else {
          subDir[folder] = {};
          queue.push(folder);
        }
        break;
      case "ls":
        break;
      case "dir":
        subDir[folder] = {};
        break;
      case "file":
        subDir[fileName] = fileSize;
        break;
      default:
        throw new Error(`Could not match any cases for ${type}`);
    }
  });

  getSumOfDirectories(fileSystem, "/");

  const dirsSum = Object.values(dirSizes)
    .filter((o) => o <= 100_000)
    .reduce((acc, curr) => acc + curr, 0);

  Logger.success(`Part 1: ${dirsSum}`);

  const unusedSpace = 7000_0000 - dirSizes["/"];
  const sizeToDelete = 3000_0000 - unusedSpace;

  const eligibleSizes = Object.values(dirSizes).filter(
    (o) => o >= sizeToDelete
  );

  Logger.success(`Part 2: ${Math.min(...eligibleSizes)}`);
};

const getDir = (
  fileSystem: Record<string, any>,
  queue: Array<string>
): Record<string, any> => {
  const k = queue.shift();

  if (!k) {
    return fileSystem;
  }

  return getDir(fileSystem[k], queue);
};

const dirSizes: Record<string, any> = {};
let i = 1;

const getSumOfDirectories = (dir: Record<string, any>, k: string): number => {
  const subDir = dir[k];

  const sum = Object.entries(subDir).reduce((acc, [k, v]) => {
    if (typeof v === "number") {
      return acc + v;
    }

    return acc + getSumOfDirectories(subDir, k);
  }, 0);

  if (dirSizes[k]) {
    dirSizes[`${k}_${i++}`] = sum;
  } else {
    dirSizes[k] = sum;
  }

  return sum;
};
