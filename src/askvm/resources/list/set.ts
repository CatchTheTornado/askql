import { any, resource } from '../../lib';

export const set = resource({
  type: any,
  async resolver(arr: Array<any>, index: number, value: any) {
    const newArr = arr.slice();
    newArr[index] = value;
    return newArr;
  },
});
