import { getAsArray } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  const sequence = getAsArray('08.txt').map((o) => {
    const match = o.match(/(acc|jmp|nop) (\+|\-)(\d+)/);

    if (!match) {
      throw new Error('No match found.');
    }

    const [, instruction, unaryOperator, num] = match;

    return {
      instruction,
      num: parseInt(num, 10) * (unaryOperator === '+' ? 1 : -1),
    };
  });

  let globalAcc = 0;
  const pastOperations = [0];

  for (let i = 0; i < sequence.length; ) {
    const { instruction, num } = sequence[i];

    switch (instruction) {
      case 'acc':
        globalAcc += num;
        i++;
        break;
      case 'jmp':
        i += num;
        break;
      case 'nop':
        i++;
        break;
      default:
        throw new Error('No case matched.');
    }

    if (pastOperations.includes(i)) {
      break;
    } else {
      pastOperations.push(i);
    }
  }

  success(`Part 1: ${globalAcc}`);

  (() => {
    let lastIndex = 0;

    while (true) {
      const newSequence = [...sequence.map((o) => ({ ...o }))];
      const nextIndex = newSequence.findIndex(
        (o, i) =>
          i > lastIndex && ['jmp', 'nop'].some((x) => x === o.instruction)
      );
      lastIndex = nextIndex;

      if (newSequence[nextIndex].instruction === 'jmp') {
        newSequence[nextIndex].instruction = 'nop';
      } else {
        newSequence[nextIndex].instruction = 'jmp';
      }

      let globalAcc = 0;
      const pastOperations = [0];
      let valid = true;

      for (let i = 0; i < newSequence.length; ) {
        const { instruction, num } = newSequence[i];

        switch (instruction) {
          case 'acc':
            globalAcc += num;
            i++;
            break;
          case 'jmp':
            i += num;
            break;
          case 'nop':
            i++;
            break;
          default:
            throw new Error('No case matched.');
        }

        if (pastOperations.includes(i)) {
          valid = false;
          break;
        } else {
          pastOperations.push(i);
        }
      }

      if (valid) {
        success(`Part 2: ${globalAcc}`);
        break;
      }
    }
  })();
};
