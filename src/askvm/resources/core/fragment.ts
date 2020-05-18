import { any, resource } from '../../lib';
import { fun } from './fun';

export const fragment = resource({
  type: any,
  async compute(options, code) {
    // console.log(code.name, code.params, 'args:', args);
    return fun.compute(options, code, []);
  },
});
