import { AskCode } from '../../askcode';
import { evaluate } from './evaluate';
import type { Options } from './evaluate';
import { resources } from './resources';
import { typed, untyped } from './typed';
import type { JSONable, Typed } from './typed';

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
        // TODO rename to callArgs
        const values = node!.children
          ?.map((arg: any) => evaluate(arg))
          .map(untyped);
        return resolver(...(values ?? []));
      }

      // function call
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
