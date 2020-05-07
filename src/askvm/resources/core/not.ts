import { resource } from '../../lib/resource';
import { boolean, lambda, Typed } from '../../lib/typed';

export const not = resource<Typed<(a: boolean) => boolean>>({
  type: lambda(boolean, boolean),
  resolver(a: boolean): boolean {
    return !a;
  },
});
