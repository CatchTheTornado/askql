import { resource } from '../../lib/resource';
import { run, Options } from '../../lib/run';
import { lambda, string, typed, Typed } from '../../lib/typed';

export const fun = resource<Typed<Function>>({
  type: lambda(string, string),
  async compute(options, code, args) {
    // console.log(code.name, code.params, 'args:', args);

    if (!args) {
      return typed(code); // TODO typed needs to understand AskCode
    }

    // create a new scope
    const resources = Object.create(options.resources ?? {});

    // add simple argument resolvers in the scope
    args.forEach((arg, index) => {
      resources[`$${index}`] = arg;
    });

    const runOptions = {
      resources,
      values: options.values,
      returnedValue: undefined,
    };

    let result: any;
    const { params = [] } = code;
    for (let i = 0; i < params.length; i += 1) {
      result = await run(runOptions, params[i]);
      if (runOptions.returnedValue) {
        return typed(runOptions.returnedValue);
      }
    }
    return typed(result);
  },
});
