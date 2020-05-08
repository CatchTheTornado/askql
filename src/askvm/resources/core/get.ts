import { askCode } from '../../../askcode';
import { resource } from '../../lib/resource';
import { lambda, string, Typed, untyped } from '../../lib/typed';
import { run } from '../../lib';

export const get = resource<Typed<any>>({
  type: lambda(string, string),
  async compute(options, code, args) {
    const [child] = code.params!;
    const typedName = await run(options, child, args);
    const name = untyped(typedName);
    if (typeof name !== 'string') {
      throw new Error('Get expect string as argument');
    }

    return run(options, askCode({ name }), args);
  },
});
