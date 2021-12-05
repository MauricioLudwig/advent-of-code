import { TDayFn } from '../@@types';
import { Divisor, Input, Logger } from '../@@utils';

export default async (): TDayFn => {
  const input = new Input('./2021/files/05.txt').asArray.map((o) => {
    const [, x1, y1, x2, y2] = o.match(/(\d+)\,(\d+) -> (\d+)\,(\d+)/) || [];
    return {
      x1: parseInt(x1!, 10),
      y1: parseInt(y1!, 10),
      x2: parseInt(x2!, 10),
      y2: parseInt(y2!, 10),
    };
  });

  const validPoints = input.filter((o) => o.x1 === o.x2 || o.y1 === o.y2);

  const maxX = Math.max(...validPoints.map((o) => [o.x1, o.x2]).flat());
  const maxY = Math.max(...validPoints.map((o) => [o.y1, o.y2]).flat());

  const grid = Array(maxY + 1)
    .fill(0)
    .map((_) => {
      return Array(maxX + 1).fill(0);
    });

  validPoints.forEach((o) => {
    console.log('o', o);
    const xStart = o.x1 < o.x2 ? o.x1 : o.x2;
    const xEnd = o.x2 > o.x1 ? o.x2 : o.x1;
    const yStart = o.y1 < o.y2 ? o.y1 : o.y2;
    const yEnd = o.y2 > o.y1 ? o.y2 : o.y1;

    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        grid[y]![x]! += 1;
      }
    }
  });

  //   for (let i = 0; i < maxX; i++) {
  //     for (let y = 0; y < maxY; y++) {
  //         if (i === ) {

  //         }
  //       grid[i]![y]!++;
  //     }
  //   }

  console.log('grid', grid);

  //   let print = '';

  //   for (let i = 0; i < grid.length; i++) {
  //     let s = '';

  //     for (let y = 0; y < grid[i]!.length; y++) {
  //       if (grid[i]![y]! > 0) {
  //         s += grid[i]![y]!;
  //       } else {
  //         s += '.';
  //       }
  //     }

  //     print += `${s}\n`;
  //   }

  const sum = grid.flat(Infinity).reduce((acc, curr) => {
    return acc + (curr > 1 ? 1 : 0);
  }, 0);

  console.log('Part 1', sum);
  console.log('end');
};
