import { run } from '../../lib';
import { resource } from '../../lib/resource';
import { lambda, string, typed, Typed } from '../../lib/typed';

export const call = resource<Typed<any>>({
  type: lambda(string, string),
  compute(options, { params }) {
    const [funChild, ...argChildren] = params!;
    const args = argChildren.map((child) => run(options, child));
    const result = run(options, funChild, args);
    return typed(result); // TODO add result type
  },
});
