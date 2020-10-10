import { any, resource } from '../../lib';

export const push = resource({
  type: any,
  async resolver(arr: Array<any>, value: any) {
    arr.push(value);
    return arr;
  },
});
