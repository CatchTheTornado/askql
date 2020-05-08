import { run } from '../../lib';
import { resource } from '../../lib/resource';
import { lambda, string, typed, Typed } from '../../lib/typed';
import { asyncMap } from '../../../utils';

export const call = resource<Typed<any>>({
  type: lambda(string, string),
  async compute(options, { params }) {
    const [funChild, ...argChildren] = params!;
    const args = await asyncMap(argChildren, (child) => run(options, child));
    const result = await run(options, funChild, args);
    return typed(result); // TODO add result type
  },
});
