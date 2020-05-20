import { int, resource } from '../../lib';

export const size = resource({
  type: int,
  async resolver(string: string) {
    return string.length;
  },
});
