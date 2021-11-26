import yargs from 'yargs';

(async () => {
  const parser = yargs(process.argv.slice(2));
  const { _ } = await parser.argv;
  const [year, day] = _;

  const dayFn = require(`./${year}/${day}`);
  await dayFn.default();
})();
