import { number, resource } from '../../lib';

export const divideBy = resource({
  type: number,
  async resolver(a: number, b: number) {
    return a - b;
  },
});
