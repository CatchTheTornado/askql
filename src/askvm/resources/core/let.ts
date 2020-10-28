import {
  any,
  resource,
  run,
  runUntyped,
  Options,
  TypedValue,
  JSONable,
} from '../../lib';

function assignValue(
  valueObject: { [key: string]: any },
  key: string,
  assignedValue: any
) {
  if (Object.isFrozen(valueObject[key]))
    throw new Error(`Cannot assign to a constant variable "${key}"`);
  valueObject[key] = assignedValue;
}

export const letRes = resource({
  type: any,
  async compute(options, code, args): Promise<TypedValue<JSONable>> {
    const { params: children = [] } = code;

    const key: any = await runUntyped(options, children[0]); // FIXME any
    const value = await run(options, children[1]);

    if (key === 'resources') {
      throw new Error(`Key "resources" cannot be redeclared`);
    }

    options.values![key] = value;

    return value;
  },
});
