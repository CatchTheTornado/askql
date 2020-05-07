import { askCode, AskCodeOrValue, isValue } from '../../askcode';
import { assert, flatten, titleCase } from '../../utils';
import * as components from './';

export function createElement(
  name: string | Function,
  propsOrNull: Record<string, AskCodeOrValue> | null,
  ...children: AskCodeOrValue[]
): AskCodeOrValue {
  const props = propsOrNull || {};

  if (typeof name === 'function') {
    return name({ ...props, children });
  }

  if (name === 'code') {
    const propKeys = Object.keys(props);
    if (propKeys.length !== 1 || typeof propKeys[0] !== 'string') {
      throw new Error('Invalid code use');
    }
    return askCode({
      name: propKeys[0],
      params: flatten(children),
    });
  }

  if (name === 'v') {
    const child = flatten(children)[0];
    assert(isValue(child), 'expecting child to be value');
    return askCode(child);
  }

  assert(name != null, 'name cannot be null');
  const component = (components as any)[titleCase(name)];
  assert(component != null, 'expecting jsx component');
  return createElement(component, propsOrNull, ...children);
}
