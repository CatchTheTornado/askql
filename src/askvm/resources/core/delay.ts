import { any, resource } from '../../lib';

export const delay = resource({
  type: any,
  async resolver() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
});
