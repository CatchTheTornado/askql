import { resource, number } from '../../lib';

export const ceil = resource({
  type: number,
  async resolver(value: number) {
    return Math.ceil(value);
  },
});
