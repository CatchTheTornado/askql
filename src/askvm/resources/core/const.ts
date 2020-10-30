import {
  any,
  resource,
  run,
  runUntyped,
  TypedValue,
  JSONable,
} from '../../lib';

export const constRes = resource({
  type: any,
  async compute(options, code, args): Promise<TypedValue<JSONable>> {
    const { params: children = [] } = code;

    const key: any = await runUntyped(options, children[0]); // FIXME any
    const value = await run(options, children[1]);

    if (key === 'resources') {
      throw new Error(`Key "resources" cannot be redeclared`);
    }
    options.values![key] = value;
    Object.freeze(options.values![key]);
    return value;
  },
});
