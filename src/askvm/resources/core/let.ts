import {
  any,
  resource,
  run,
  runUntyped,
  TypedValue,
  JSONable,
  preventReservedKeywords,
} from '../../lib';

export const letRes = resource({
  type: any,
  async compute(options, code, args): Promise<TypedValue<JSONable>> {
    const { params: children = [] } = code;

    const key: any = await runUntyped(options, children[0]); // FIXME any
    const value = await run(options, children[1]);

    preventReservedKeywords(key);

    options.values![key] = value;

    return value;
  },
});
