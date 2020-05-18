import { resource, string } from '../../lib';

export const upperCase = resource({
  type: string,
  async resolver(value: string) {
    return value.toUpperCase();
  },
});
