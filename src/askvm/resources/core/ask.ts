import { any, resource } from '../../lib';
import { fun } from './fun';

export const ask = resource({
  type: any,
  async compute(options, code, args) {
    return fun.compute(options, code, args ?? []);
  },
});
