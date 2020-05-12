import { asyncMap } from '../../../utils';
import { any, resource, runUntyped } from '../../lib';

export const map = resource<any, any[]>({
  type: any,
  resolver(...values: any[]): any {
    const map = new Map();
    if (!values || values.length % 2 === 1) {
      throw new Error('Maps need to have an even number of children');
    }
    for (let i = 0; i < values.length; i += 2) {
      map.set(values[i], values[i + 1]);
    }
    return map; // typed
  },
  async compute(options, { params: items = [] }) {
    // TODO allow bare identifiers instead of string (syntax sugar)
    // TODO accept list of pairs from syntax sugar
    return this.resolver!(
      ...(await asyncMap(items, (item) => runUntyped(options, item)))
    );
  },
});
