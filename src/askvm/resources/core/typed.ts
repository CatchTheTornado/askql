import { run } from '../../lib';
import { resource } from '../../lib/resource';
import { lambda, string, typed, Typed } from '../../lib/typed';

export const typedRes = resource<Typed<any>>({
  type: lambda(string, string),
  async compute(options, code) {
    const value = await run(options, code.params![0]);
    const type = await run(options, code.params![1]);
    return typed(value, type);
  },
});
