import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

enum Operation {
  snd = 'snd',
  set = 'set',
  add = 'add',
  sub = 'sub',
  mul = 'mul',
  mod = 'mod',
  rcv = 'rcv',
  jgz = 'jgz',
  jnz = 'jnz',
}

export interface IInstruction {
  operation: string;
  x: string;
  y: string | null;
}

export interface IRegister {
  [key: string]: number;
}

export class Program {
  queue: number[] = [];
  messages: number[] = [];
  messagesSent = 0;
  index = 0;
  isStalled = false;
  operationsInvoked: IRegister = {};
  iteration = 0;

  constructor(public register: IRegister) {
    this.operationsInvoked = Object.keys(Operation).reduce(
      (acc, curr): IRegister => {
        return {
          ...acc,
          [curr]: 0,
        };
      },
      {}
    );
  }

  run1(instructions: IInstruction[]): boolean {
    const { operation, x, y } = instructions[this.index];

    let offset = 1;
    let recover = false;
    this.iteration += 1;
    this.operationsInvoked[operation] += 1;

    const n1: number = x.match(/[a-z]/) ? this.register[x] : parseInt(x);
    let n2: number = 0;

    if (y) {
      n2 = y.match(/[a-z]/) ? this.register[y] : parseInt(y);
    }

    switch (operation) {
      case Operation.snd:
        this.messages.push(n1);
        this.messagesSent++;
        break;
      case Operation.set:
        this.register[x] = n2;
        break;
      case Operation.add:
        this.register[x] += n2;
        break;
      case Operation.sub:
        this.register[x] -= n2;
        break;
      case Operation.mul:
        this.register[x] *= n2;
        break;
      case Operation.mod:
        this.register[x] %= n2;
        break;
      case Operation.rcv:
        if (n1 !== 0) {
          recover = true;
        }
        break;
      case Operation.jgz:
        if (n1 > 0) {
          offset = n2;
        }
        break;
      case Operation.jnz:
        if (n1 !== 0) {
          offset = n2;
        }
        break;
      default:
        throw new Error(`No case matched: ${operation}`);
    }

    this.index += offset;
    return recover;
  }

  run2(instructions: IInstruction[]): void {
    const { operation, x, y } = instructions[this.index];

    let offset = 1;
    this.isStalled = false;
    this.iteration += 1;
    this.operationsInvoked[operation] += 1;

    const n1: number = x.match(/[a-z]/) ? this.register[x] : parseInt(x);
    let n2: number = 0;

    if (y) {
      n2 = y.match(/[a-z]/) ? this.register[y] : parseInt(y);
    }

    switch (operation) {
      case Operation.snd:
        this.messages.push(n1);
        this.messagesSent++;
        break;
      case Operation.set:
        this.register[x] = n2;
        break;
      case Operation.add:
        this.register[x] += n2;
        break;
      case Operation.sub:
        this.register[x] -= n2;
        break;
      case Operation.mul:
        this.register[x] *= n2;
        break;
      case Operation.mod:
        this.register[x] %= n2;
        break;
      case Operation.rcv:
        const n = this.queue.shift();
        if (n !== undefined) {
          this.register[x] = n;
        } else {
          this.isStalled = true;
          offset = 0;
        }
        break;
      case Operation.jgz:
        if (n1 > 0) {
          offset = n2;
        }
        break;
      case Operation.jnz:
        if (n1 !== 0) {
          offset = n2;
        }
        break;
      default:
        throw new Error(`No case matched: ${operation}`);
    }

    this.index += offset;
  }
}

export default (): void => {
  const instructions: IInstruction[] = getAsArray('18.txt').map(
    (o): IInstruction => {
      const [operation, x, y = null] = o.split(' ');
      return { operation, x, y };
    }
  );

  const register: IRegister = instructions
    .filter((o) => o.x.match(/[a-z]/))
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr.x]: 0,
      };
    }, {});

  const programA = new Program({ ...register });

  while (true) {
    if (programA.run1(instructions)) {
      break;
    }
  }

  success(`Part 1: ${programA.messages.pop()}`);

  const programB0 = new Program({ ...register });
  const programB1 = new Program({ ...register, ['p']: 1 });

  while (true) {
    while (true) {
      programB0.run2(instructions);

      if (programB0.isStalled) {
        programB1.queue.push(...programB0.messages);
        programB0.messages = [];
        break;
      }
    }

    while (true) {
      programB1.run2(instructions);

      if (programB1.isStalled) {
        programB0.queue.push(...programB1.messages);
        programB1.messages = [];
        break;
      }
    }

    if (
      programB0.isStalled &&
      programB0.queue.length === 0 &&
      programB1.isStalled &&
      programB1.queue.length === 0
    ) {
      break;
    }
  }

  success(`Part 2: ${programB1.messagesSent}`);
  end();
};
