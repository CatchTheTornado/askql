import { Reducer, reduce } from './reduce';

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
    readonly params?: AskCodeOrValue[]
  ) {
    // Let's make parent non-numberable so we can properly log AskCode objects
    Object.defineProperty(this, 'parent', {
      enumerable: false,
      writable: true,
    });

    params?.forEach((param) => {
      if (isValue(param)) {
        return;
      }
      param.parent = this;
    });
  }

  parent?: AskCode;

  toString(): string {
    return askCodeToSource(this);
  }
}

export const askCodeReducer: Reducer<string> = {
  node: (name, ...args) => `${name}(${args.join(', ')})`,
  id: (name) => name,
  value: (value) => JSON.stringify(value),
};

export function askCodeToSource(value: AskCodeOrValue): string {
  if (isValue(value)) {
    return JSON.stringify(value);
  }
  const { name, params } = value;
  return `${name}${
    params ? `(${params.map(askCodeToSource).join(', ')})` : ''
  }`;
}

export function isValue(value: AskCodeOrValue): value is Value {
  // array and objects need to be transported using respective constructors
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

  if (Array.isArray(value)) {
    throw new Error('value!');
  }

  return new AskCode(value.name, value.params);
}
