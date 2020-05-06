import { resource } from '../../lib/resource';
import { askCode } from '../../../askcode';
import { lambda, string, untyped, Typed } from '../../lib/typed';

export const get = resource<Typed<any>>({
  type: lambda(string, string),
  compute(code, { args, options, step }) {
    const [child] = code.params!;
    const typedName = step(options, child, args);
    const name = untyped(typedName);
    if (typeof name !== 'string') {
      throw new Error('Call!?!');
    }
    return step(options, askCode({ name }), args);
  },
});
