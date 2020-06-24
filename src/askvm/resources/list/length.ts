import { any, resource } from '../../lib';

export const length = resource({
  type: any,
  async resolver(arr: Array<any>) {
    return arr.length;
  },
});
