import { any, resource } from '../../lib';

export const greaterThan = resource({
  type: any,
  async resolver(a: number, b: number): Promise<boolean> {
    return a > b;
  },
});
