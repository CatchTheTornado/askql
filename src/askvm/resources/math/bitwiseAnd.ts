import { resource, number } from '../../lib';

export const bitwiseAnd = resource({
  type: number,
  async resolver(a: number, b: number): Promise<number> {
    return a & b;
  },
});
