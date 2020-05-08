import { resource } from '../../lib/resource';
import { lambda, string, Typed } from '../../lib/typed';

export const max = resource<Typed<(a: number, b: number) => number>>({
  type: lambda(string, string),
  resolver: Math.max,
});
