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
    throw new Error(
      `Cannot assign to a constant variable "${key}" because it is a constant.`
    );
  valueObject[key] = assignedValue;
}

export const assignRes = resource({
  type: any,
  async compute(options, code, args): Promise<TypedValue<JSONable>> {
    const { params: children = [] } = code;

    const key: any = await runUntyped(options, children[0]); // FIXME any
    const value = await run(options, children[1]);

    if (key === 'resources') {
      throw new Error(
        `Key "resources" is a reserved keyword and cannot be assigned to.`
      );
    }

    let keyFound = false;
    for (
      let prototype: Options | undefined = options;
      prototype;
      prototype = prototype?.prototype
    ) {
      const { values = {} } = prototype;
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        assignValue(values, key, value);
        keyFound = true;
        return value;
      }
    }
    if (keyFound === false)
      throw new Error(`Cannot assign to an unknown variable "${key}"`);

    options.values![key] = value;

    return value;
  },
});
