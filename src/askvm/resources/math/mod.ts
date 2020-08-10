import { any, resource } from '../../lib';

export const mod = resource({
  type: any,
  async resolver(a: number, b: number): Promise<number> {
    return a % b;
  },
});
