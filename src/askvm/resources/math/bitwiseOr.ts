import { number, resource } from '../../lib';

export const bitwiseOr = resource({
  type: number,
  async resolver(a: number, b: number): Promise<number> {
    return a | b;
  },
});
