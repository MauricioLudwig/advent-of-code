import { getHistory } from "./09";

describe("should test getHistory fn", () => {
  const fixtures: [number[], number[][]][] = [
    [
      [0, 3, 6, 9, 12, 15],
      [
        [0, 3, 6, 9, 12, 15],
        [3, 3, 3, 3, 3],
        [0, 0, 0, 0],
      ],
    ],
  ];

  test.each(fixtures)("should test for %s", (arg, res) => {
    expect(getHistory(arg)).toEqual(res);
  });
});
