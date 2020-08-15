import { success, end } from '../utils/logger';

interface IRecipe {
  score: number;
  index: number;
}

export default (): void => {
  const numOfRecipes = 864801;
  const numOfRecipesToRetrieve = 10;

  let recipes = [3, 7];
  const currentRecipes: IRecipe[] = [
    {
      score: 3,
      index: 0,
    },
    {
      score: 7,
      index: 1,
    },
  ];

  const desiredScoreSequence = numOfRecipes.toString().split('').map(Number);
  let currentScoreSequence: number[] = [];

  while (true) {
    const recipeScoreSum = currentRecipes.reduce((acc, curr): number => {
      return acc + curr.score;
    }, 0);

    const scores = recipeScoreSum.toString().split('').map(Number);

    scores.forEach((o): void => {
      recipes.push(o);
      currentScoreSequence.push(o);

      if (!checkArrEquality(currentScoreSequence, desiredScoreSequence)) {
        currentScoreSequence = [];
      }
    });

    currentRecipes.forEach((o): void => {
      const newIndex = (o.index + o.score + 1) % recipes.length;
      o.index = newIndex;
      o.score = recipes[newIndex];
    });

    if (currentScoreSequence.length >= desiredScoreSequence.length) {
      success(`Part 2: ${recipes.length - currentScoreSequence.length}`);
      break;
    }
  }

  const next10Scores = recipes.slice(
    numOfRecipes,
    numOfRecipes + numOfRecipesToRetrieve
  );
  success(`Part 1: ${next10Scores.join('')}`);

  end();
};

const checkArrEquality = (current: number[], desired: number[]): boolean => {
  let equal = true;
  const len = current.length > 6 ? 6 : current.length;

  for (let i = 0; i < len; i++) {
    if (current[i] !== desired[i]) {
      equal = false;
      break;
    }
  }

  return equal;
};
