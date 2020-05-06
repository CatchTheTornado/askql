import { resource } from '../../lib/resource';
import { lambda, string, untyped, Typed } from '../../lib/typed';

export const object = resource<Typed<Record<string, any>>>({
  type: lambda(string, string),
  resolver(...args: any[]): any {
    const result: Record<string, any> = {};
    for (let i = 0; i + 1 < args.length; i += 2) {
      result[String(args[i])] = args[i + 1];
    }
    return result; // typed
  },
  compute({ params: items = [] }, { options, step }) {
    // TODO allow bare identifiers instead of string (syntax sugar)
    // TODO accept list of pairs from syntax sugar
    return this.resolver!(
      ...items.map((param) => step(options, param)).map(untyped)
    );
  },
});
