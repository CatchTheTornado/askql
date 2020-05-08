export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion error: ${message}`);
  }
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isStringArray(value: any): value is string[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every(isString);
}

export function flatten<T>(
  arr: (T | T[])[],
  options: { arrays?: boolean; objectValues?: boolean } = {}
): T[] {
  const { arrays = true, objectValues = false } = options;
  return arr.reduce<T[]>(function (result, item) {
    if (arrays && Array.isArray(item)) {
      return result.concat(flatten(item, options));
    }
    if (objectValues && item && typeof item === 'object') {
      return result.concat(flatten(Object.values(item), options));
    }
    return result.concat(item);
  }, []);
}

export function titleCase(s: string): string {
  return `${s[0].toUpperCase()}${s.slice(1)}`;
}
