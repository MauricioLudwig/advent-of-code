import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface IInstruction {
  [key: string]: {
    label: string;
    value: null | number;
  };
}

const OPCODE_INSTRUCTION: IInstruction = {
  addr: {
    label: 'addr',
    value: null,
  },
  addi: {
    label: 'addi',
    value: null,
  },
  mulr: {
    label: 'mulr',
    value: null,
  },
  muli: {
    label: 'muli',
    value: null,
  },
  banr: {
    label: 'banr',
    value: null,
  },
  bani: {
    label: 'bani',
    value: null,
  },
  borr: {
    label: 'borr',
    value: null,
  },
  bori: {
    label: 'bori',
    value: null,
  },
  setr: {
    label: 'setr',
    value: null,
  },
  seti: {
    label: 'seti',
    value: null,
  },
  gtir: {
    label: 'gtir',
    value: null,
  },
  gtri: {
    label: 'gtri',
    value: null,
  },
  gtrr: {
    label: 'gtrr',
    value: null,
  },
  eqir: {
    label: 'eqir',
    value: null,
  },
  eqri: {
    label: 'eqri',
    value: null,
  },
  eqrr: {
    label: 'eqrr',
    value: null,
  },
};

interface IOpcode {
  before: number[];
  instruction: number[];
  after: number[];
  operations: string[];
}

export default (): void => {
  const inputA = getAsArray('16A.txt').filter((o) => o !== '');
  const inputB = getAsArray('16B.txt').map((o): number[] =>
    extractDigitsFromString(o)
  );

  const opcodes: IOpcode[] = [];

  while (inputA.length !== 0) {
    const [beforeStr, instructionStr, afterStr] = inputA.splice(0, 3);

    opcodes.push({
      before: extractDigitsFromString(beforeStr),
      instruction: extractDigitsFromString(instructionStr),
      after: extractDigitsFromString(afterStr),
      operations: [],
    });
  }

  opcodes.forEach((opcode): void => {
    Object.values(OPCODE_INSTRUCTION).forEach((opcodeInstruction) => {
      const newAfter = opcodeMachine(
        opcode.before,
        opcode.instruction,
        opcodeInstruction.label
      );
      const isEqual = newAfter.every((a, i) => a === opcode.after[i]);

      if (isEqual) {
        opcode.operations.push(opcodeInstruction.label);
      }
    });
  });

  const opcodeThriceOrMore = opcodes.reduce(
    (acc, curr) => acc + (curr.operations.length >= 3 ? 1 : 0),
    0
  );
  success(`Part 1: ${opcodeThriceOrMore}`);

  while (true) {
    const instructions = Object.values(OPCODE_INSTRUCTION).map((o) => o);

    if (instructions.every((o) => o.value !== null)) {
      break;
    }

    const instructionsWithValues = instructions
      .filter((o) => o.value !== null)
      .map((o) => o.label);

    opcodes
      .filter(
        (o) =>
          o.operations.filter((x) => !instructionsWithValues.includes(x))
            .length === 1
      )
      .forEach((o) => {
        const [opcodeInstruction] = o.instruction;
        const [operation] = o.operations.filter(
          (o) => !instructionsWithValues.includes(o)
        );

        if (OPCODE_INSTRUCTION[operation].value === null) {
          OPCODE_INSTRUCTION[operation].value = opcodeInstruction;
        }
      });
  }

  let register = [0, 0, 0, 0];

  inputB.forEach((o): void => {
    const [instruction] = o;
    const opcodeInstruction =
      Object.values(OPCODE_INSTRUCTION).find((o) => o.value === instruction)
        ?.label ?? '';
    const after = opcodeMachine(register, o, opcodeInstruction);
    register = [...after];
  });

  success(`Part 2: ${register[0]}`);

  end();
};

const opcodeMachine = (
  before: number[],
  instruction: number[],
  opcodeInstruction: string
): number[] => {
  const after = [...before];
  const [, A, B, C] = instruction;
  let newVal;

  switch (opcodeInstruction) {
    case OPCODE_INSTRUCTION.addr.label:
      newVal = before[A] + before[B];
      break;
    case OPCODE_INSTRUCTION.addi.label:
      newVal = before[A] + B;
      break;
    case OPCODE_INSTRUCTION.mulr.label:
      newVal = before[A] * before[B];
      break;
    case OPCODE_INSTRUCTION.muli.label:
      newVal = before[A] * B;
      break;
    case OPCODE_INSTRUCTION.banr.label:
      newVal = before[A] & before[B];
      break;
    case OPCODE_INSTRUCTION.bani.label:
      newVal = before[A] & B;
      break;
    case OPCODE_INSTRUCTION.borr.label:
      newVal = before[A] | before[B];
      break;
    case OPCODE_INSTRUCTION.bori.label:
      newVal = before[A] | B;
      break;
    case OPCODE_INSTRUCTION.setr.label:
      newVal = before[A];
      break;
    case OPCODE_INSTRUCTION.seti.label:
      newVal = A;
      break;
    case OPCODE_INSTRUCTION.gtir.label:
      newVal = A > before[B] ? 1 : 0;
      break;
    case OPCODE_INSTRUCTION.gtri.label:
      newVal = before[A] > B ? 1 : 0;
      break;
    case OPCODE_INSTRUCTION.gtrr.label:
      newVal = before[A] > before[B] ? 1 : 0;
      break;
    case OPCODE_INSTRUCTION.eqir.label:
      newVal = A === before[B] ? 1 : 0;
      break;
    case OPCODE_INSTRUCTION.eqri.label:
      newVal = before[A] === B ? 1 : 0;
      break;
    case OPCODE_INSTRUCTION.eqrr.label:
      newVal = before[A] === before[B] ? 1 : 0;
      break;
    default:
      throw new Error(`No case matched ${opcodeInstruction}`);
  }

  after[C] = newVal;
  return after;
};

const extractDigitsFromString = (str: string): number[] => {
  const pattern = new RegExp(/(\d+)/, 'g');
  const [...digits] = str.match(pattern) || [];
  return digits.map(Number);
};
