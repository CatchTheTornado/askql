import { AskCode, AskCodeOrValue, isValue, Value } from '../../askcode';
import type { Resources } from './resource';

export function step<T, R extends Resources = Resources>(
  options: ComputeOptions<T, R>,
  codeOrValue: AskCodeOrValue,
  args?: T[]
): T {
  const frame = { options, resources: options.resources, args, step };

  if (isValue(codeOrValue)) {
    return options.value(codeOrValue, frame);
  }

  return options.code(codeOrValue, frame);
}

export interface ComputeOptions<T, R = Resources> {
  resources: R;
  code: (code: AskCode, frame: Frame<T, R>) => T;
  value: (value: Value, frame: Frame<T, R>) => T;
}

export interface Frame<T, R = Resources> {
  options: ComputeOptions<T, R>;
  resources: R;
  step: typeof step;
  args?: T[];
}
