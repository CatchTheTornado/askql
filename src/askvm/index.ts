import type { AskCodeOrValue } from '../askcode';
import { extendOptions, run as libRun, untyped } from './lib';
import type { JSONable, Options, TypedValue } from './lib';
import * as types from './lib/type';
import * as resources from './resources';
export { extendOptions, resource, typed, untyped } from './lib';
export type { Options, Resource, Resources, Values } from './lib';
export { resources, types };

export async function run(
  inputOptions: Options,
  code: AskCodeOrValue,
  args?: any[]
): Promise<TypedValue<JSONable>> {
  const options = extendOptions(inputOptions, {
    stats: {
      steps: 0,
    },
    limits: {
      steps: 10 ** 4,
    },
  });
  return libRun(options, code, args);
}

export async function runUntyped(
  options: Options,
  code: AskCodeOrValue,
  args?: any[]
): Promise<JSONable> {
  return untyped(await run(options, code, args));
}
