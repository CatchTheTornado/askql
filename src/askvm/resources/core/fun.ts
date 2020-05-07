import { resource } from '../../lib/resource';
import { step } from '../../lib/step';
import { lambda, string, typed, Typed } from '../../lib/typed';

export const fun = resource<Typed<Function>>({
  type: lambda(string, string),
  compute(code, { options, args }) {
    if (!args) {
      return typed(code); // TODO typed musi rozumieć tę strukturę
    }

    // create scope for this function
    code.scope = {};

    // TODO add arguments in scope with assertion
    // or add a resolver for reading them

    let result: any;
    const { params = [] } = code;
    for (let i = 0; i < params.length; i += 1) {
      const child = params[i];
      result = step(options, child); // TODO rename to run()
    }
    return typed(result);
  },
});
