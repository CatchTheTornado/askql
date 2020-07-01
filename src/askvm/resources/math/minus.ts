import { any, resource } from '../../lib';

export const minus = resource({
  type: any,
  async resolver(a: number, b: number): Promise<number> {
    if (typeof b === 'undefined') {
      // unary minus
      return -a;
    } else {
      // binary minus
      return a - b;
    }
  },
});
