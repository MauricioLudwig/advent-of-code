import yargs from 'yargs';

(async () => {
  const parser = yargs(process.argv.slice(2));
  const { _ } = await parser.argv;
  const [year, day] = _;

  const fn = require(`./${year}/${day}`);
  await fn.default();
})();
