import { AskCode } from '../../askcode';
import { allTypes, any, code, Type, validate } from './type';

export class TypedValue<T> {
  readonly type!: Type<T>;
  readonly value!: T;
}

const defaults: Pick<TypedValue<any>, 'type'> = {
  type: any,
};

export function typedValue<T>(
  options?: Partial<TypedValue<any>>
): TypedValue<T> {
  return Object.assign(new TypedValue(), defaults, options);
}

export const inferableTypes = allTypes;

export function typed(value: any, type?: any): TypedValue<any> {
  if (value instanceof TypedValue) {
    // if already a typed value, don't wrap again
    // TODO optionally perform assertion if `type` is given and is more strict
    return value;
  }

  if (value instanceof AskCode) {
    // TODO return a custom runnable resource implementation
    // so that function const is callable
    return typedValue({ value, type: code });
  }

  // type inference
  for (let index in inferableTypes) {
    const typeCandidate = inferableTypes[index];
    if (validate(typeCandidate, value)) {
      return typedValue({ value, type: typeCandidate });
    }
  }

  // catch-all for type any
  return typedValue({ value });
}

export type JSONable =
  | null
  | string
  | boolean
  | number
  | JSONable[]
  | { [key: string]: JSONable };

// export function untyped<T>(value: TypedValue<T>): T;
export function untyped(value: any): any {
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
