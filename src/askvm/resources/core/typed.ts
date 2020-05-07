import { run } from '../../lib';
import { resource } from '../../lib/resource';
import { lambda, string, typed, Typed } from '../../lib/typed';

export const typedRes = resource<Typed<any>>({
  type: lambda(string, string),
  compute(options, code) {
    const value = run(options, code.params![0]);
    const type = run(options, code.params![1]);
    return typed(value, type);
  },
});
