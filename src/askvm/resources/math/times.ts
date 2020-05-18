import { any, resource } from '../../lib';

export const times = resource({
  type: any,
  async resolver(a: number, b: number): Promise<number> {
    return a * b;
  },
});
