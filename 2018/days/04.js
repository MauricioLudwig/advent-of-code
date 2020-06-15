import { getAsArray } from '../input/index.js';
import { success, danger, end } from '../utils/logger.js';

export default () => {
  const input = getAsArray('04.txt');

  // Part 1
  const sortedTimeline = input.map(o => {
    const [, date, , minute, text] = o.match(/\[(\d{4}-\d{2}-\d{2} (\d{2}):(\d{2}))\] (.+)/);
    return {
      date,
      minute: parseInt(minute, 10),
      text
    }
  }).sort(sortByDate);

  const guardSchedule = {};
  let currentGuard = null;
  let asleepAt = null;

  sortedTimeline.forEach(o => {
    if (o.text.includes('Guard')) {
      const [, id] = o.text.match(/Guard #(\d+)/);
      currentGuard = id;

      if (!guardSchedule.hasOwnProperty(id)) {
        guardSchedule[id] = {
          minuteOccurence: {},
          totalSleep: 0,
          id
        };
      }
    } else if (o.text.includes('wakes up')) {
      const sleepDuration = o.minute - asleepAt;
      const guard = guardSchedule[currentGuard];
      guard.totalSleep = guard.totalSleep + sleepDuration;
      const numbersArr = createNumbersArrayByRange(asleepAt, o.minute);
      numbersArr.forEach(num => {
        if (guard.minuteOccurence.hasOwnProperty(num)) {
          guard.minuteOccurence[num].occurences = guard.minuteOccurence[num].occurences + 1;
        } else {
          guard.minuteOccurence[num] = {
            occurences: 1,
            minute: num
          };
        }
      });
    } else if (o.text.includes('falls asleep')) {
      asleepAt = o.minute;
    } else {
      danger(`Unable to match string accordingly: ${o.text}`);
    }
  });

  const [schedule] = Object.values(guardSchedule).sort((a, b) => b.totalSleep - a.totalSleep);
  const [minuteOccurences] = Object.values(schedule.minuteOccurence).sort((a, b) => b.occurences - a.occurences);
  success(`Part 1: ${schedule.id * minuteOccurences.minute}`);

  // Part 2
  let guard = null;
  let maxMinuteOccurence = { minute: null, occurence: 0 };

  Object.values(guardSchedule).forEach(o => {
    const [minuteOccurences] = Object.values(o.minuteOccurence).sort((a, b) => b.occurences - a.occurences);
    if (minuteOccurences && minuteOccurences.occurences > maxMinuteOccurence.occurence) {
      maxMinuteOccurence.occurence = minuteOccurences.occurences;
      maxMinuteOccurence.minute = minuteOccurences.minute;
      guard = o.id;
    }
  });

  success(`Part 2: ${guard * maxMinuteOccurence.minute}`);
  end();
};

const sortByDate = (a, b) => {
  if (a.date < b.date) {
    return -1;
  }

  if (b.date > a.date) {
    return 1;
  }

  return 0;
};

const createNumbersArrayByRange = (low, high) => {
  const arr = [];

  for (let i = low; i < high; i++) {
    arr.push(i);
  };

  return arr;
};
