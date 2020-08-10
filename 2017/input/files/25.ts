interface IBlueprint {
  [key: string]: {
    [key: string]: {
      value: number;
      moveOffset: number;
      nextState: string;
    };
  };
}

export const blueprint: IBlueprint = {
  A: {
    0: {
      value: 1,
      moveOffset: 1,
      nextState: 'B',
    },
    1: {
      value: 0,
      moveOffset: -1,
      nextState: 'B',
    },
  },
  B: {
    0: {
      value: 0,
      moveOffset: 1,
      nextState: 'C',
    },
    1: {
      value: 1,
      moveOffset: -1,
      nextState: 'B',
    },
  },
  C: {
    0: {
      value: 1,
      moveOffset: 1,
      nextState: 'D',
    },
    1: {
      value: 0,
      moveOffset: -1,
      nextState: 'A',
    },
  },
  D: {
    0: {
      value: 1,
      moveOffset: -1,
      nextState: 'E',
    },
    1: {
      value: 1,
      moveOffset: -1,
      nextState: 'F',
    },
  },
  E: {
    0: {
      value: 1,
      moveOffset: -1,
      nextState: 'A',
    },
    1: {
      value: 0,
      moveOffset: -1,
      nextState: 'D',
    },
  },
  F: {
    0: {
      value: 1,
      moveOffset: 1,
      nextState: 'A',
    },
    1: {
      value: 1,
      moveOffset: -1,
      nextState: 'E',
    },
  },
};
