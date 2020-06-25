import { any, resource, run, runUntyped, Options } from '../../lib';

export const letRes = resource({
  type: any,
  async compute(options, code, args) {
    const { params: children = [] } = code;

    const key: any = await runUntyped(options, children[0]); // FIXME any
    const value = await run(options, children[1]);

    if (typeof key !== 'string') {
      throw new Error(`Expected set key to be string, got: ${typeof key}`);
    }

    if (key === 'resources') {
      throw new Error(`Key "resources" cannot be redeclared`);
    }

    if (code.name === 'assign') {
      for (
        let prototype: Options | undefined = options;
        prototype;
        prototype = prototype?.prototype
      ) {
        const { values = {} } = prototype;
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          values[key] = value;
          return value;
        }
      }
      throw new Error(`Cannot assign to an unknown variable "${key}"`);
    }

    options.values![key] = value;
    return value;
  },
});
