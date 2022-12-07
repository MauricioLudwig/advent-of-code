import { Input, Logger } from "../@@utils";

const patterns = {
  path: /(dir|cd) ([\w\.\/]+)/,
  file: /(\d+) ([A-Za-z\.]+)/,
  ls: /ls/,
};

type Instruction = {
  type: string;
  folder?: string;
  fileName?: string;
  fileSize?: number;
};

export default async () => {
  const input: Array<Instruction> = new Input(
    "./2022/files/07.txt"
  ).asArray.map((o) => {
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
  });

  // console.log("input", input);

  const fileSystem: Record<string, any> = {};
  const queue: Array<string> = [];

  input.forEach((o) => {
    const subTree = getNestedObj(fileSystem, [...queue]);

    switch (o.type) {
      case "cd":
        if (o.folder === "..") {
          queue.pop();
        } else {
          subTree[o.folder ?? ""] = {};
          queue.push(o.folder ?? "");
        }
        break;
      case "ls":
        break;
      case "dir":
        subTree[o.folder ?? ""];
        break;
      case "file":
        subTree[o.fileName ?? ""] = o.fileSize;
        break;
      default:
        throw new Error(`Could not match any cases for ${o}`);
    }
  });

  getSumOfDirectories(fileSystem, "/");

  // console.log(dirSizes);

  const sum = Object.values(dirSizes)
    .filter((o) => o <= 100000)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(`Part 1: ${sum}`);

  const unusedSpace = 7000_0000 - dirSizes["/"];
  const sizeToDelete = 3000_0000 - unusedSpace;

  const eligibleSizes = Object.values(dirSizes).filter(
    (o) => o >= sizeToDelete
  );

  console.log(`Part 2: ${Math.min(...eligibleSizes)}`);
};

const getNestedObj = (
  fileSystem: Record<string, any>,
  queue: Array<string>
): any => {
  const k = queue.shift();

  if (!k) {
    return fileSystem;
  }

  return getNestedObj(fileSystem[k], queue);
};

const dirSizes: Record<string, any> = {};
let index = 1;

const getSumOfDirectories = (dir: Record<string, any>, k: string): number => {
  const obj = dir[k];

  const sum = Object.entries(obj).reduce((acc, [k, v]) => {
    if (typeof v === "number") {
      return acc + v;
    }

    return acc + getSumOfDirectories(obj, k);
  }, 0);

  if (dirSizes[k]) {
    dirSizes[`${k}_${index++}`] = sum;
  } else {
    dirSizes[k] = sum;
  }

  return sum;
};
