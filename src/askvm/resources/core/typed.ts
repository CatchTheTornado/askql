import { resource } from '../../lib/resource';
import { lambda, string, typed, Typed } from '../../lib/typed';

export const typedRes = resource<Typed<any>>({
  type: lambda(string, string),
  compute(code, { options, step }) {
    const value = step(options, code.params![0]);
    const type = step(options, code.params![1]);
    return typed(value, type);
  },
});
