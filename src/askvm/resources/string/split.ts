import { resource, string } from '../../lib';

export const split = resource({
  type: string,
  async resolver(arr: any, delim: string) {
    return arr.split(delim);
  },
});
