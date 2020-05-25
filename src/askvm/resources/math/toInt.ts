import { resource, int } from '../../lib';

export const toInt = resource({
  type: int,
  async resolver(value: any) {
    return Number(value);
  },
});
