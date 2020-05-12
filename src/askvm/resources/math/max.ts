import { flatten } from '../../../utils';
import { any, resource } from '../../lib';

export const max = resource({
  type: any,
  async resolver(...numbers: number[]): Promise<number> {
    const flatNumbers = flatten(numbers, {
      arrays: true,
      objectValues: true,
    });
    return Math.max(...flatNumbers);
  },
});
