import { any, resource } from '../../lib';

export const lessThanOrEqual = resource({
  type: any,
  async resolver(a: number, b: number): Promise<boolean> {
    return a <= b;
  },
});
