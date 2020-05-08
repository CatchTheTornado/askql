import { resource } from '../../lib/resource';
import { lambda, string, Typed } from '../../lib/typed';
import { flatten } from '../../../utils';

export const max = resource<Typed<(numbers: number[]) => number>>({
  type: lambda(string, string),
  resolver(...numbers: number[]): number {
    return Math.max(...flatten(numbers));
  },
});
