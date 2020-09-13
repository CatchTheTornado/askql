import { number, resource } from '../../lib';

export const div = resource({
  type: number,
  async resolver(a: number, b: number) {
    return Math.floor(a / b);
  },
});
