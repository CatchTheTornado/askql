import { AskCode, AskCodeOrValue, isAskCode } from '../../askcode';
import { asyncMap } from '../../utils';
import { Resource, Resources } from './resource';
import { JSONable, typed, TypedValue, untyped } from './typed';

export type Values = Record<string, any>;
export interface Options {
  code?: AskCode;
  result?: any;
  prototype?: Options;
  resources?: Resources;
  values?: Values;
}

let ops = 0;

function logValue<T>(message: string, value: T): T {
  console.log(message, value);
  return value;
}

export async function run(
  options: Options,
  code: AskCodeOrValue,
  args?: any[]
): Promise<TypedValue<JSONable>> {
  if (!isAskCode(code)) {
    console.log('not askcode', code);
    return typed(code);
  }

  ops += 1;
  if (ops > 1000) {
    // throw new Error('Over ops limit!');
  }

  const { resources = {}, values = {} } = options;
  const { name } = code;

  if (name in values) {
    const value = typed(values[name]);

    if (value.type.name === 'code') {
      const callCode = value.value as AskCode;
      const callParams = code.params;
      const callArgs = callParams
        ? await asyncMap(callParams, (child) => run(options, child))
        : args;

      if (callArgs) {
        console.log('callArgs', callArgs);
        return await run(options, callCode, callArgs);
      }
    }

    return value;
  }

  if (name in resources) {
    if (!(resources[name] instanceof Resource)) {
      console.error('resource', resources[name]);
      throw new Error(`Invalid resource "${name}"`);
    }
    return typed(await resources[name].compute(options, code, args));
  }

  throw new Error(`Unknown identifier '${name}'!`);
}

export async function runUntyped(
  options: Options,
  code: AskCodeOrValue,
  args?: any[]
): Promise<JSONable> {
  return untyped(await run(options, code, args));
}
