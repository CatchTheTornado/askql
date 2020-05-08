import { run } from '../../lib';
import { resource } from '../../lib/resource';
import { lambda, string, Typed, untyped } from '../../lib/typed';
import { asyncMap } from '../../../utils';

export const object = resource<Typed<Record<string, any>>>({
  type: lambda(string, string),
  resolver(...args: any[]): any {
    const result: Record<string, any> = {};
    for (let i = 0; i + 1 < args.length; i += 2) {
      result[String(args[i])] = args[i + 1];
    }
    return result; // typed
  },
  async compute(options, { params: items = [] }) {
    // TODO allow bare identifiers instead of string (syntax sugar)
    // TODO accept list of pairs from syntax sugar
    return this.resolver!(
      ...(await asyncMap(items, (param) => run(options, param))).map(untyped)
    );
  },
});
