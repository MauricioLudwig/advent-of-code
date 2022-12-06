import { Input, Logger } from '../@@utils';

export default async () => {
  const input = new Input('./2021/files/02.txt').asArray.map((o) => {
    const [s1, s2] = o.split(' ');
    return {
      dir: s1,
      val: parseInt(s2!, 0),
    };
  });

  (() => {
    let pos = 0;
    let depth = 0;

    input.forEach(({ dir, val }) => {
      switch (dir) {
        case 'forward':
          pos += val;
          break;
        case 'up':
          depth -= val;
          break;
        case 'down':
          depth += val;
          break;
        default:
          throw new Error(`${dir} did not match any cases`);
      }
    });

    const sum = pos * depth;
    Logger.success(`Part 1: ${sum}`);
  })();

  (() => {
    let pos = 0;
    let depth = 0;
    let aim = 0;

    input.forEach(({ dir, val }) => {
      switch (dir) {
        case 'forward':
          pos += val;
          depth += aim * val;
          break;
        case 'up':
          aim -= val;
          break;
        case 'down':
          aim += val;
          break;
        default:
          throw new Error(`${dir} did not match any cases`);
      }
    });

    const sum = pos * depth;
    Logger.success(`Part 2: ${sum}`);
  })();
};
