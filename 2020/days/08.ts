import { getAsArray } from '../input';
import { success } from '../utils/logger';

type TInstruction = {
  operation: string;
  num: number;
};

class Console {
  sequence: Array<TInstruction> = [];
  globalAcc = 0;
  pastOperations = [0];
  valid = true;

  constructor(sequence: Array<TInstruction>) {
    this.sequence = [...sequence.map((o) => ({ ...o }))];
  }

  run(): void {
    for (let i = 0; i < this.sequence.length; ) {
      const { operation, num } = this.sequence[i];

      switch (operation) {
        case 'acc':
          this.globalAcc += num;
          i++;
          break;
        case 'jmp':
          i += num;
          break;
        case 'nop':
          i++;
          break;
        default:
          throw new Error(`No case matched (${operation}).`);
      }

      if (this.pastOperations.includes(i)) {
        this.valid = false;
        break;
      } else {
        this.pastOperations.push(i);
      }
    }
  }

  get acc(): number {
    return this.globalAcc;
  }
}

export default (): void => {
  const sequence: Array<TInstruction> = getAsArray('08.txt').map((o) => {
    const match = o.match(/(acc|jmp|nop) (\+|\-)(\d+)/);

    if (!match) {
      throw new Error('No match found.');
    }

    const [, operation, unaryOperator, num] = match;

    return {
      operation,
      num: parseInt(num, 10) * (unaryOperator === '+' ? 1 : -1),
    };
  });

  const console = new Console(sequence);
  console.run();
  success(`Part 1: ${console.acc}`);

  let lastIndex = 0;

  while (true) {
    const console = new Console(sequence);
    const nextIndex = console.sequence.findIndex(
      (o, i) => i > lastIndex && ['jmp', 'nop'].some((x) => x === o.operation)
    );
    lastIndex = nextIndex;
    console.sequence[nextIndex].operation =
      console.sequence[nextIndex].operation === 'jmp' ? 'nop' : 'jmp';
    console.run();

    if (console.valid) {
      success(`Part 2: ${console.acc}`);
      break;
    }
  }
};
