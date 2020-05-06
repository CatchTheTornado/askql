import { resource } from '../../lib/resource';
import { lambda, string, Typed, typed } from '../../lib/typed';

export const list = resource<
  Typed<any[]>,
  (...args: Typed<any>[]) => Typed<any[]>
>({
  type: lambda(string, string),
  resolver(...args: any[]) {
    return typed([...args]);
  },
  compute(code, { step, options }) {
    const values = code.params!.map((param) => step(options, param));
    return this.resolver!(...values);
  },
});
