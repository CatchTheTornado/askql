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
