import {
  askCode,
  AskCodeOrValue,
  isValue,
  value,
  toAskCode,
} from '../../askcode';
import { assert, flatten, titleCase } from '../../utils';
import * as components from './';

export function createElement(
  name: string | Function,
  propsOrNull: Record<string, AskCodeOrValue> | null,
  ...children: AskCodeOrValue[]
): AskCodeOrValue {
  const props = propsOrNull || {};

  if (name === 'code') {
    const propKeys = Object.keys(props);
    if (propKeys.length !== 1 || typeof propKeys[0] !== 'string') {
      throw new Error('Invalid code use');
    }
    return toAskCode({
      name: propKeys[0],
      params: flatten(children),
    });
  }

  if (typeof name === 'string') {
    const component = (components as any)[titleCase(name)];
    assert(component != null, `no jsx component for "${name}"`);
    return createElement(component, propsOrNull, ...children);
  }

  if (typeof name === 'function') {
    return name({ ...props, children });
  }

  throw new Error(`Invalid JSX name typed: ${typeof name}`);
}
