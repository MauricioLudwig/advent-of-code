import { getAsSingleLine } from '../input';
import { success } from '../utils/logger';

export default (): void => {
  let sequence = getAsSingleLine('09.txt').trim();
  let countFrom = 0;

  while (true) {
    const searchSequence = sequence.substring(countFrom);
    const instance = getFirstMarkerInstance(searchSequence);

    if (!instance) {
      break;
    }

    const { marker, n1, n2 } = instance;

    const iMarkerStart = searchSequence.indexOf(marker);
    const iSubSequenceStart = iMarkerStart + marker.length;
    const iSubSequenceEnd = iSubSequenceStart + n1;

    const subSequence = searchSequence.substring(
      iSubSequenceStart,
      iSubSequenceEnd
    );
    const newSubSequence = subSequence.repeat(n2);

    sequence =
      sequence.substring(0, countFrom) +
      searchSequence.substring(0, iMarkerStart) +
      newSubSequence +
      searchSequence.substring(iSubSequenceEnd);

    countFrom = countFrom + iMarkerStart + newSubSequence.length;
  }

  success(`Part 1: ${sequence.length}`);
};

type TGetFirstMarkerInstance = (
  sequence: string
) => {
  marker: string;
  n1: number;
  n2: number;
} | null;

export const getFirstMarkerInstance: TGetFirstMarkerInstance = (sequence) => {
  const match = sequence.match(/(\((\d+)x(\d+)\))/);

  if (!match) {
    return null;
  }

  const [, marker, n1, n2] = match;
  return {
    marker,
    n1: parseInt(n1, 10),
    n2: parseInt(n2, 10),
  };
};
