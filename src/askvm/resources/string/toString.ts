import { resource, string } from '../../lib';

export const toString = resource({
  type: string,
  async resolver(value: any): Promise<string> {
    return String(value);
  },
});
