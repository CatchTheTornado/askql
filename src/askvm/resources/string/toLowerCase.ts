import { resource, string } from '../../lib';

export const toLowerCase = resource({
  type: string,
  async resolver(value: string) {
    return value.toLowerCase();
  },
});
