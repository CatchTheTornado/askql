import { resource } from '../../lib/resource';
import { getScope } from '../../lib/run';
import { lambda, string, Typed } from '../../lib/typed';

export const letRes = resource<Typed<any[]>>({
  type: lambda(string, string),
  compute(code, { options, resources, step }) {
    const { params: children = [] } = code;
    const value = step(options, children[1]);
    const key: any = step(options, children[0]); // FIXME any

    if (key.type !== string) {
      throw new Error(`Expected set key to be string, got: ${key.type}`);
    }

    const scope = getScope(resources, code);
    if (key.value in scope) {
      throw new Error(`Scope already has key ${key.value}`);
    }
    scope[key.value] = value;
    return value;
  },
});
