import { any, resource } from '../../lib';

export const is = resource({
  type: any,
  async resolver(a: any, b: any): Promise<boolean> {
    return a == b;
  },
});
