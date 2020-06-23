import { any, extendOptions, resource, run } from '../../lib';

export const fun = resource({
  type: any,
  async compute(options, code, args) {
    if (!args) {
      return code; // TODO typed needs to understand AskCode
    }

    options = extendOptions(options, {
      code, // currently executed code available as value
    });

    // add simple argument resolvers in the scope
    args.forEach((arg, index) => {
      options.values![`$${index}`] = arg;
    });

    let lastResult = null;
    const { params: statements = [] } = code;
    for (let i = 0; i < statements.length; i += 1) {
      const statement = statements[i];
      lastResult = await run(options, statement);
      if ('result' in options) {
        return options.result;
      }
    }
    return lastResult;
  },
});
