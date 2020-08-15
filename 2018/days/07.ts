import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface IStep {
  step: string;
  next: string;
}

export default (): void => {
  const input = getAsArray('07.txt');

  const steps = input.map(
    (o): IStep => {
      const match = o.match(
        /Step (\w) must be finished before step (\w) can begin\./
      );

      if (!match) {
        throw new Error('No match found.');
      }

      const [, step, next] = match;
      return { step, next };
    }
  );

  const stepCollection = Array.from(new Set(steps.map((o): string => o.step)));
  const nextCollection = Array.from(new Set(steps.map((o): string => o.next)));
  let queue = stepCollection.filter((o) => !nextCollection.includes(o)).sort();

  let sequence: string[] = [];

  while (queue.length > 0) {
    const letter = getNextStep(queue, steps, sequence);
    sequence.push(letter);
    const nextSteps = getNextSteps(letter, steps);
    queue = removeDuplicatesAndSort([...queue, ...nextSteps]);
  }

  success(`Part 1: ${sequence.join('')}`);
  end();
};

const removeDuplicatesAndSort = (arr: string[]): string[] =>
  Array.from(new Set(arr)).sort();

type GetNextStep = (
  queue: string[],
  steps: IStep[],
  sequence: string[]
) => string;

const getNextStep: GetNextStep = (queue, steps, sequence) => {
  let letter = '';

  while (true) {
    letter = queue.shift() || '';
    const prevSteps = steps
      .filter((step) => step.next === letter)
      .map((o): string => o.step);
    const stepsCompleted = prevSteps.every((o) => {
      return [...sequence, letter].some((x) => o === x);
    });

    if (stepsCompleted) {
      break;
    } else {
      queue.push(letter);
    }
  }

  return letter;
};

const getNextSteps = (step: string, steps: IStep[]): string[] =>
  steps.filter((o) => o.step === step).map((o): string => o.next);
