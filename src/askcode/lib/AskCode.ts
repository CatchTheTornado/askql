export type Value = null | boolean | number | string;
export type AskCodeOrValue = AskCode | Value;

export class AskCode {
  constructor(
    /**
     * name of the resource to refer to
     */
    readonly name: string,
    /**
     * optional arguments for calling the resource as a function
     */
    // TODO rename params
    readonly params?: AskCodeOrValue[]
  ) {}

  /** local scope of values */
  scope?: Record<string, any>;

  /** vm uses this for resolving scope*/
  parent?: AskCode;
}

export function isValue(value: AskCodeOrValue): value is Value {
  return (
    value == null ||
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'string'
  );
}

export function askCode(value: Value): AskCodeOrValue;
export function askCode(call: AskCode): AskCodeOrValue;
export function askCode(value: Value | AskCode): AskCodeOrValue {
  if (value == null) {
    return null;
  }

  if (isValue(value)) {
    return value;
  }

  return new AskCode(value.name, value.params);
}
