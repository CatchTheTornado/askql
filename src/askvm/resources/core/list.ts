import { resource } from '../../lib/resource';
import { lambda, string, Typed, typed } from '../../lib/typed';
import { run } from '../../lib';
import { asyncMap } from '../../../utils';

export const list = resource<
  Typed<any[]>,
  (...args: Typed<any>[]) => Typed<any[]>
>({
  type: lambda(string, string),
  resolver(...args) {
    return typed([...args]);
  },
  async compute(options, { params: items }) {
    const itemValues = await asyncMap(items!, (item) => run(options, item));
    return this.resolver!(...itemValues);
  },
});
