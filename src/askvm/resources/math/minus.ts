import { any, resource } from '../../lib';

export const minus = resource({
  type: any,
  async resolver(a: number, b: number): Promise<number> {
    return a - b;
  },
});
