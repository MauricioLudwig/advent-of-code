import { getAsArray } from '../input/index.js';
import { success, end } from '../utils/logger.js';

export default () => {
  const input = getAsArray('07.txt');

  const steps = input.map(o => {
    const [, step, next] = o.match(/Step (\w) must be finished before step (\w) can begin\./);
    return { step, next };
  });

  // find starting sequence
  const stepCollection = [...new Set(steps.map(o => o.step))];
  const nextCollection = [...new Set(steps.map(o => o.next))];
  let queue = stepCollection.filter(o => !nextCollection.includes(o)).sort();

  let sequence = [];

  while (queue.length > 0) {
    const letter = getNextStep(queue, steps, sequence);
    sequence.push(letter);
    const nextSteps = getNextSteps(letter, steps);
    queue = removeDuplicatesAndSort([...queue, ...nextSteps]);
  }

  success(`Part 1: ${sequence.join('')}`);
  end();
};

const removeDuplicatesAndSort = (arr) => Array.from(new Set(arr)).sort();

const getNextStep = (queue, steps, sequence) => {
  let letter = null;

  while (true) {
    letter = queue.shift();
    const prevSteps = steps.filter(step => step.next === letter).map(o => o.step);
    const stepsCompleted = prevSteps.every(o => [...sequence, letter].some(x => o === x));

    if (stepsCompleted) {
      break;
    } else {
      queue.push(letter);
    }
  }

  return letter;
};

const getNextSteps = (step, steps) => steps.filter(o => o.step === step).map(o => o.next);