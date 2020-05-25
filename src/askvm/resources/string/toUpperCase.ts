import { resource, string } from '../../lib';

export const toUpperCase = resource({
  type: string,
  async resolver(value: string) {
    return value.toUpperCase();
  },
});
