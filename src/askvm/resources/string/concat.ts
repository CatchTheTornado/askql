import { flatten } from '../../../utils';
import { resource, string, untyped } from '../../lib';

export const concat = resource({
  type: string,
  async resolver(...strings: number[]): Promise<string> {
    const flatStrings = flatten(untyped(strings), {
      arrays: true,
      objectValues: true,
    }) as string[];
    return String.prototype.concat(...flatStrings);
  },
});
