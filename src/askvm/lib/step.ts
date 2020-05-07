import { AskCode, AskCodeOrValue, isValue, Value } from '../../askcode';
import type { Resources } from './resource';

// TODO remove (not used anymore)

export function step<T, R extends Resources = Resources>(
  options: ComputeOptions<T, R>,
  codeOrValue: AskCodeOrValue,
  args?: T[]
): T {
  if (isValue(codeOrValue)) {
    return options.value(codeOrValue);
  }

  return options.code(codeOrValue);
}

export interface ComputeOptions<T, R = Resources> {
  resources: R;
  code: (code: AskCode) => T;
  value: (value: Value) => T;
}
