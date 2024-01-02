import { getPrimeFactorization } from "./calc";

describe("test suites for getPrimeFactorization utility function", () => {
  const fixtures: [number[], number][] = [
    [[2, 2, 2, 3], 24],
    [[3, 3, 3], 27],
  ];

  test.each(fixtures)("should return %s", (res, arg) => {
    expect(getPrimeFactorization(arg)).toEqual(res);
  });
});
