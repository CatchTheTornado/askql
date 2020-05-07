import { resource } from '../../lib/resource';
import { lambda, string, Typed, typed } from '../../lib/typed';
import { run } from '../../lib';

export const list = resource<
  Typed<any[]>,
  (...args: Typed<any>[]) => Typed<any[]>
>({
  type: lambda(string, string),
  resolver(...args) {
    return typed([...args]);
  },
  compute(options, { params: items }) {
    const itemValues = items!.map((item) => run(options, item));
    return this.resolver!(...itemValues);
  },
});
