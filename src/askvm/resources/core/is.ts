import { resource } from '../../lib/resource';
import { lambda, string, Typed } from '../../lib/typed';

type Value = Typed<any>;

export const is = resource<Value>({
  type: lambda(string, string),
  resolver(a: any, b: any): boolean {
    return a == b;
  },
});
