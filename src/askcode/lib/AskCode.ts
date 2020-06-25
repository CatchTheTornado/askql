import { Reducer } from './reduce';

export type Value = Exclude<null | boolean | number | string | object, AskCode>;
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
      if (!isAskCode(param)) {
        return;
      }
      param.parent = this;
    });
  }

  parent?: AskCode;

  toString({
    pretty = false,
    indent = '    ',
  }: { pretty?: boolean; indent?: string } = {}): string {
    if (pretty) {
      return askCodeToPretty(this, indent);
    } else {
      return askCodeToSource(this);
    }
  }
}

export const askCodeReducer: Reducer<string> = {
  node: (name, ...args) => `${name}(${args.join(', ')})`,
  id: (name) => name,
  value: (value) => JSON.stringify(value),
};

export function isValue(value: AskCodeOrValue): value is Value {
  return (
    value == null ||
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'string' ||
    (typeof value === 'object' && !(value instanceof AskCode))
  );
}

export function isAskCode(value: AskCodeOrValue): value is AskCode {
  return value instanceof AskCode;
}

const resourceAliasMap: Record<string, string> = {
  fragment: 'f',
};

export function askCodeToSource(value: AskCodeOrValue): string {
  if (typeof value === 'string') {
    return `'${value.replace(/\'/g, "\\'")}'`;
  }
  if (!isAskCode(value)) {
    return String(value);
  }
  const { name, params } = askCode(value);
  return `${resourceAliasMap[name] ?? name}${
    params ? `(${params.map(askCodeToSource).join(',')})` : ''
  }`;
}

export function askCodeToPretty(
  value: AskCodeOrValue,
  indent: string = '  ',
  totalIndent: string = ''
): string {
  if (typeof value === 'string') {
    return `'${value.replace(/\'/g, "\\'")}'`;
  }
  if (!isAskCode(value)) {
    return String(value);
  }
  const { name, params } = askCode(value);

  const displayName = resourceAliasMap[name] ?? name;

  // If there are no params, the output is simple.
  if (!params) {
    return displayName;
  }

  // If there are params, pretty print if asked for it, otherwise just print.
  if (indent !== '') {
    return (
      `${displayName}(\n` +
      `${totalIndent}${indent}` +
      `${params
        .map((el) => askCodeToPretty(el, indent, totalIndent + indent))
        .join(`,\n${totalIndent}${indent}`)}\n` +
      `${totalIndent})`
    );
  }

  return `${displayName}(${params.map((el) => askCodeToPretty(el)).join(',')})`;
}

export function askCode(code: AskCodeOrValue): AskCode {
  if (!isAskCode(code)) {
    throw new Error('Expecting code but got value');
  }
  return new AskCode(code.name, code.params);
}

export function value(value: AskCodeOrValue): Value {
  if (!isValue(value)) {
    throw new Error('Expecting value');
  }
  return value;
}

export function toAskCode(code: Readonly<AskCode>): AskCode {
  if (code instanceof AskCode) {
    return code;
  }
  return new AskCode(code.name, code.params);
}

export function toAskCodeOrValue(value: Value | AskCode): AskCodeOrValue {
  if (isValue(value)) {
    return value;
  }
  return toAskCode(value);
}
