import { resource, number } from '../../lib';

export const floor = resource({
  type: number,
  async resolver(value: number) {
    return Math.floor(value);
  },
});
