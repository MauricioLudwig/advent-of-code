import { primary } from './utils/logger';
import day from './days/01';

primary('app.ts running!');

(async () => {
  await day();
})();

primary('app.ts finished execution!');
