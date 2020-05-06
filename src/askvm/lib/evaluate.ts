import { AskCode, AskNode, AskValue } from '../../askcode';

export type Resolvers<Key extends keyof any, T> = Record<Key, Resolver<Key, T>>;

export type Resolver<Key extends keyof any, T> = (
  options: ResolverOptions<Key, T>
) => T;

export interface ResolverOptions<Key extends keyof any, T> {
  node: AskNode<Key>;
  value: AskValue;
  evaluate: (code: AskCode<Key>, args?: T[]) => T;
  options: Options<Key, T>;
  args?: T[];
}

export interface Options<Key extends keyof any, T> {
  node: Resolver<Key, T>;
  leaf: Resolver<Key, T>;
}

export function evaluate<Key extends keyof any, T>(
  options: Options<Key, T>,
  code: AskCode<Key>,
  args?: undefined | T[]
): T {
  let resolver: Resolver<Key, T>;
  let node: undefined | AskNode<Key>;
  let value: undefined | AskValue;
  if (!code || typeof code !== 'object') {
    resolver = options.leaf;
    value = code;
  } else {
    resolver = options.node;
    node = code;
  }

  const result = resolver({
    node: node as any,
    value: value as any,
    options,
    evaluate: (code: AskCode<Key>, args?: T[]) => evaluate(options, code, args),
    args,
  });
  return result;
}
