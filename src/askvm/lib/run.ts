import { AskNode, AskCode } from '../../askcode';
import { options as runOptions } from './options';

export type Resolvers<Key extends keyof any, T> = Record<Key, Resolver<Key, T>>;

export type Resolver<Key extends keyof any, T> = (
  options: ResolverOptions<Key, T>
) => T;

export interface ResolverOptions<Key extends keyof any, T> {
  node: AskNode<Key>;
  run: (code: AskCode<Key>, args?: T[]) => T;
  options: Options<Key, T>;
}

export interface Options<Key extends keyof any, T> {
  resolvers: Resolvers<Key, T>;
  valueResolver: Key;
}

function tick<Key extends keyof any, T>(
  code: AskCode<Key>,
  args?: undefined | T[]
): T {
  const options: Options<Key, T> = runOptions as any;

  const node: AskNode<Key> =
    typeof code === 'string'
      ? { type: options.valueResolver, children: [code] }
      : code;
  const result = options.resolvers[node.type]({
    node,
    options,
    run: (code: AskCode<Key>, args?: T[]) => tick(code, args),
  });
  return result;
}

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
  if (typeof value == 'object' && !('value' in value)) {
    return value;
  }

  const val = value.value;
  if (Array.isArray(val)) {
    return val.map(untyped);
  }
  return untyped(val);
}

export function run<Key extends keyof any>(code: AskCode<Key>): JSONable {
  const result = tick(code);
  return untyped(result);
}
