import { any, resource, run } from '../../lib';

export const fun = resource({
  type: any,
  async compute(options, code, args) {
    // console.log(code.name, code.params, 'args:', args);

    if (!args) {
      return code; // TODO typed needs to understand AskCode
    }

    // create a new scope
    const values = Object.create(options.values ?? {});

    // add simple argument resolvers in the scope
    args.forEach((arg, index) => {
      values[`$${index}`] = arg;
    });

    const runOptions = {
      resources: options.resources,
      values,
      returnedValue: undefined,
    };

    let result: any;
    const { params = [] } = code;
    for (let i = 0; i < params.length; i += 1) {
      result = await run(runOptions, params[i]);
      if (runOptions.returnedValue) {
        return runOptions.returnedValue;
      }
    }
    return result;
  },
});
