import { any, resource } from '../../lib';

export const push = resource({
  type: any,
  async resolver(arr: Array<any>, value: any) {
    const newArr = arr.slice();
    newArr.push(value);
    return newArr;
  },
});
