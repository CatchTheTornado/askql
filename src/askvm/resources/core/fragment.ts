import { any, resource } from '../../lib';
import { fun } from './fun';

export const fragment = resource({
  type: any,
  async compute(options, code) {
    return fun.compute(options, code, []);
  },
});
