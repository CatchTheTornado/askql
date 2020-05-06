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
  args?: T[];
}

export interface Options<Key extends keyof any, T> {
  resolvers: Resolvers<Key, T>;
  valueResolver: Key;
}

let counter = 0;

function tick<Key extends keyof any, T>(
  code: AskCode<Key>,
  args?: undefined | T[]
): T {
  const options: Options<Key, T> = runOptions as any;

  counter += 1;

  if (counter === 20) {
    throw new Error('stop');
  }

  let resolver: any;

  if (typeof code === 'string') {
    resolver = options.resolvers[options.valueResolver];
  } else {
    resolver = (options.resolvers as any).call;
  }

  const result = resolver({
    node: code,
    options,
    run: (code: AskCode<Key>, args?: T[]) => tick(code, args),
    args,
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

export function run<Key extends keyof any>(code: AskCode<Key>): JSONable {
  const result = tick(code);
  return untyped(result);
}
