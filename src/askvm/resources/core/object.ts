import { asyncMap } from '../../../utils';
import { any, resource, runUntyped } from '../../lib';

/**
 * Creates a new object using JavaScript object
 */
export const object = resource<any, any[]>({
  type: any,
  resolver(...args: any[]): any {
    const result: Record<string, any> = {};
    if (!args || args.length % 2 === 1) {
      throw new Error('Objects need to have an even number of children');
    }
    for (let i = 0; i + 1 < args.length; i += 2) {
      result[String(args[i])] = args[i + 1];
    }
    return result; // typed
  },
  async compute(options, { params: items = [] }) {
    // TODO allow bare identifiers instead of string (syntax sugar)
    // TODO accept list of pairs from syntax sugar
    return this.resolver!(
      ...(await asyncMap(items, (param) => runUntyped(options, param)))
    );
  },
});
