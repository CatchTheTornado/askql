import { resource, any } from '../../lib';

export const not = resource({
  type: any,
  async resolver(a: boolean): Promise<boolean> {
    return !a;
  },
});
