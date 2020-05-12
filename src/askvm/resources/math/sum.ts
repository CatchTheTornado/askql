import { resource, any, untyped } from '../../lib';
import { flatten } from '../../../utils';

export const sum = resource({
  type: any,
  async resolver(...numbers: number[]): Promise<number> {
    const flatNumbers = flatten(untyped(numbers), {
      arrays: true,
      objectValues: true,
    }) as number[];
    return flatNumbers.reduce((a, x) => a + x, 0);
  },
});
