import {
  askCode,
  AskCodeOrValue,
  isValue,
  value,
  toAskCode,
  isAskCode,
} from '../../askcode';
import { assert, flatten, titleCase } from '../../utils';
import * as components from './';

export function createElement(
  name: string | Function,
  propsOrNull: Record<string, AskCodeOrValue> | null,
  ...children: AskCodeOrValue[]
): AskCodeOrValue {
  // if (name === 'list') {
  //   return children.map(createElement);
  // }

  const props = propsOrNull || {};
  // console.log('createElement', props, ...children);

  if (name === 'code') {
    const propKeys = Object.entries(props)
      .filter(([, value]) => value != null)
      .map(([key]) => key);
    if (propKeys.length !== 1) {
      throw new Error('Invalid code use');
    }
    return toAskCode({
      name: propKeys[0],
      params: flatten(children).filter((x) => typeof x !== 'undefined'),
    });
  }

  if (typeof name === 'string') {
    const component = (components as any)[titleCase(name)];
    assert(component != null, `no jsx component for "${name}"`);
    return createElement(component, props, ...flatten(children));
  }

  if (typeof name === 'function') {
    return name({ ...props, children: flatten(children) });
  }

  throw new Error(`Invalid JSX name type: ${typeof name}`);
}
