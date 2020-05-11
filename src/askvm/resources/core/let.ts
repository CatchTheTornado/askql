import { resource } from '../../lib/resource';
import { run } from '../../lib/run';
import { lambda, string, Typed, JSONable, typed } from '../../lib/typed';

export const letRes = resource<Typed<JSONable>>({
  type: lambda(string, string),
  async compute(options, code, args) {
    // console.log(code.name, code.params, 'args:', args);

    const { params: children = [] } = code;

    const key: any = await run(options, children[0]); // FIXME any
    const value = await run(options, children[1]);

    if (key.type !== string) {
      throw new Error(`Expected set key to be string, got: ${key.type}`);
    }

    const scope = options.resources;
    if (key.value === 'resources') {
      throw new Error(`Key "resources" cannot be redeclared`);
    }

    (scope as any)[key.value] = value; // FIXME

    return value;
  },
});
