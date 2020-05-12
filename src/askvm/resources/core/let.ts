import { any, resource, run, runUntyped } from '../../lib';

export const letRes = resource({
  type: any,
  async compute(options, code, args) {
    // console.log(code.name, code.params, 'args:', args);

    const { params: children = [] } = code;

    const key: any = await runUntyped(options, children[0]); // FIXME any
    const value = await run(options, children[1]);

    if (typeof key !== 'string') {
      throw new Error(`Expected set key to be string, got: ${typeof key}`);
    }

    if (key === 'resources') {
      throw new Error(`Key "resources" cannot be redeclared`);
    }

    options.values![key] = value;
    return value;
  },
});
