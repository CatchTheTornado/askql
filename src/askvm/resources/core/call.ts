import { resource } from '../../lib/resource';
import { lambda, string, typed, Typed } from '../../lib/typed';

export const call = resource<Typed<any>>({
  type: lambda(string, string),
  compute({ params }, { options, step }) {
    const [funChild, ...argChildren] = params!;
    const args = argChildren!.map((child) => step(options, child));
    const result = step(options, funChild, args);
    return typed(result); // TODO add result type
  },
});
