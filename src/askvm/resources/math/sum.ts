import { resource } from '../../lib/resource';
import { lambda, string, Typed, untyped } from '../../lib/typed';
import { flatten } from '../../../utils';

export const sum = resource<Typed<(a: number, b: number) => number>>({
  type: lambda(string, string),
  resolver(...numbers: number[]): number {
    const flatNumbers = flatten(untyped(numbers), {
      arrays: true,
      objectValues: true,
    }) as number[];
    return flatNumbers.reduce((a, x) => a + x, 0);
  },
});
