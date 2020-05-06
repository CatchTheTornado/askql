import { AskCode } from '../../askcode';
import { evaluate } from './evaluate';
import type { Options } from './evaluate';
import { resources } from './resources';
import { typed } from './typed';
import type { Typed } from './typed';

type JSONable =
  | null
  | string
  | boolean
  | number
  | JSONable[]
  | { [key: string]: JSONable };

function untyped(value: any): JSONable {
  if (!value) {
    return value;
  }
  if (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    typeof value === 'number'
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(untyped);
  }

  if (typeof value == 'object' && !('value' in value)) {
    return value;
  }

  const val = value.value;
  if (Array.isArray(val)) {
    return val.map(untyped);
  }
  return untyped(val);
}

const options: Options<string, Typed<any>> = {
  leaf({ value }) {
    if (!value) {
      throw new Error('Expected code to be a value');
    }
    return typed(value);
  },
  node({ node, evaluate, args }) {
    if (!node) {
      throw new Error('Expected code to be a node');
    }
    let res = resources[node.type];
    if (!res) {
      throw new Error(`Unknown resource ${node.type}!`);
    }

    function baseEvaluate({ args }: any) {
      const { resolver = () => res } = res;
      if (!args) {
        return resolver();
      }
      return resolver(...args);
    }
    const { evaluate: resEvaluate = baseEvaluate } = res;
    return resEvaluate.call(res, { node, evaluate, options, args });
  },
};

export function run(code: AskCode<string>): JSONable {
  const result = evaluate<string, Typed<any>>(options, code);
  return untyped(result);
}
