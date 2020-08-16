import { getAsArray } from '../input';
import { success, danger, end } from '../utils/logger';

interface ITimeline {
  date: string;
  minute: number;
  text: string;
}

interface IGuardSchedule {
  [key: string]: {
    minuteOccurence: {
      [key: string]: {
        occurences: number;
        minute: number;
      };
    };
    totalSleep: number;
    id: number;
  };
}

export default (): void => {
  const input = getAsArray('04.txt');

  const sortedTimeline = input
    .map(
      (o): ITimeline => {
        const match = o.match(/\[(\d{4}-\d{2}-\d{2} (\d{2}):(\d{2}))\] (.+)/);

        if (!match) {
          throw new Error('No match found.');
        }

        const [, date, , minute, text] = match;

        return {
          date,
          minute: parseInt(minute),
          text,
        };
      }
    )
    .sort(sortByDate);

  const guardSchedule: IGuardSchedule = {};
  let currentGuard = '';
  let asleepAt = 0;

  sortedTimeline.forEach((o): void => {
    if (o.text.includes('Guard')) {
      const match = o.text.match(/Guard #(\d+)/);

      if (!match) {
        throw new Error('No match found.');
      }

      const [, id] = match;
      currentGuard = id;

      if (!guardSchedule.hasOwnProperty(id)) {
        guardSchedule[id] = {
          minuteOccurence: {},
          totalSleep: 0,
          id: parseInt(id),
        };
      }
    } else if (o.text.includes('wakes up')) {
      const sleepDuration = o.minute - asleepAt;
      const guard = guardSchedule[currentGuard];
      guard.totalSleep = guard.totalSleep + sleepDuration;
      const numbersArr = createNumbersArrayByRange(asleepAt, o.minute);
      numbersArr.forEach((num): void => {
        if (guard.minuteOccurence.hasOwnProperty(num)) {
          guard.minuteOccurence[num].occurences =
            guard.minuteOccurence[num].occurences + 1;
        } else {
          guard.minuteOccurence[num] = {
            occurences: 1,
            minute: num,
          };
        }
      });
    } else if (o.text.includes('falls asleep')) {
      asleepAt = o.minute;
    } else {
      danger(`Unable to match string accordingly: ${o.text}`);
    }
  });

  const [schedule] = Object.values(guardSchedule).sort(
    (a, b) => b.totalSleep - a.totalSleep
  );
  const [minuteOccurences] = Object.values(schedule.minuteOccurence).sort(
    (a, b) => b.occurences - a.occurences
  );
  success(`Part 1: ${schedule.id * minuteOccurences.minute}`);

  let guard = 0;
  let maxMinuteOccurence = { minute: 0, occurence: 0 };

  Object.values(guardSchedule).forEach((o) => {
    const [minuteOccurences] = Object.values(o.minuteOccurence).sort(
      (a, b) => b.occurences - a.occurences
    );
    if (
      minuteOccurences &&
      minuteOccurences.occurences > maxMinuteOccurence.occurence
    ) {
      maxMinuteOccurence.occurence = minuteOccurences.occurences;
      maxMinuteOccurence.minute = minuteOccurences.minute;
      guard = o.id;
    }
  });

  success(`Part 2: ${guard * maxMinuteOccurence.minute}`);
  end();
};

const sortByDate = (a: ITimeline, b: ITimeline) => {
  if (a.date < b.date) {
    return -1;
  }

  if (b.date > a.date) {
    return 1;
  }

  return 0;
};

const createNumbersArrayByRange = (low: number, high: number): number[] => {
  const arr = [];

  for (let i = low; i < high; i++) {
    arr.push(i);
  }

  return arr;
};
