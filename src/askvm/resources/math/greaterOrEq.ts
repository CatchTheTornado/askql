import { any, resource } from '../../lib';

export const greaterOrEq = resource({
  type: any,
  async resolver(a: number, b: number): Promise<boolean> {
    return a >= b;
  },
});
