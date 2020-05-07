import { run } from '../../lib';
import { resource } from '../../lib/resource';
import { lambda, string, Typed, untyped } from '../../lib/typed';

export const map = resource<Typed<Map<any, any>>>({
  type: lambda(string, string),
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
  compute(options, { params: items = [] }) {
    // TODO allow bare identifiers instead of string (syntax sugar)
    // TODO accept list of pairs from syntax sugar
    return this.resolver!(
      ...items.map((item) => run(options, item)).map(untyped)
    );
  },
});
