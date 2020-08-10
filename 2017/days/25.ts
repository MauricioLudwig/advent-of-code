import { success, end } from '../utils/logger';
import { blueprint } from '../input/files/25';

class TuringMachine {
  tape = [0];
  currentIndex = 0;
  currentState = 'A';

  run() {
    // retrieve metadata
    const currentValue = this.tape[this.currentIndex];
    const instruction = blueprint[this.currentState];
    const { value, moveOffset, nextState } = instruction[currentValue];

    // write value
    this.tape[this.currentIndex] = value;

    // move one slot
    if (moveOffset === 1) {
      this.currentIndex += moveOffset;
      if (this.tape[this.currentIndex] === undefined) {
        this.tape.push(0);
      }
    } else {
      if (this.currentIndex === 0) {
        this.tape.unshift(0);
      } else {
        this.currentIndex += moveOffset;
      }
    }

    // set next state
    this.currentState = nextState;
  }

  get checksum() {
    return this.tape.filter((o) => o === 1).length;
  }
}

export default (): void => {
  const turingMachine = new TuringMachine();
  const steps = 12586542;

  for (let i = 0; i < steps; i++) {
    turingMachine.run();
  }

  success(`Part 1: ${turingMachine.checksum}`);
  end();
};
