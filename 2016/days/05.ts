import md5 from 'crypto-js/md5';
import { success, end } from '../utils/logger';

export default (): void => {
  const doorId = 'abbhdwsy';
  let password1 = '';
  let password2 = Array(8).fill('_');
  let index = 0;

  while (password1.length < 8 || password2.some((o) => o === '_')) {
    const hash = md5(`${doorId}${++index}`).toString();

    if (/^00000\w+/.test(hash)) {
      password1 += hash[5];

      const [position, value] = hash.split('').slice(5, 7);
      const index = /\d/.test(position) ? parseInt(position) : -1;

      if (password2[index] === '_') {
        password2[index] = value;
      }
    }
  }

  success(`Part 1: ${password1.substring(0, 8)}`);
  success(`Part 2: ${password2.join('')}`);

  end();
};
