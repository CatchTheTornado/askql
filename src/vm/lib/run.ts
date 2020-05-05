export interface AskNode<Key extends keyof any> {
  type: Key;
  children?: AskNodeOrValue<Key>[];
}

export type AskNodeOrValue<Key extends keyof any> = AskNode<Key> | string;

export type AskCode<Key extends keyof any> = AskNodeOrValue<Key>;

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
  args?: undefined | T[];
  resolvers: Resolvers<Key, T>;
  valueResolver: Key;
}

// type JSONable =
//   | null
//   | string
//   | boolean
//   | number
//   | JSONable[]
//   | { [key: string]: JSONable };

export function run<Key extends keyof any, T>(
  options: Options<Key, T>,
  code: AskCode<Key>
): T {
  const node: AskNode<Key> =
    typeof code === 'string'
      ? { type: options.valueResolver, children: [code] }
      : code;
  const result = options.resolvers[node.type]({
    node,
    options,
    run: (code: AskCode<Key>, args?: T[]) => run({ ...options, args }, code),
  });
  return result;
}
