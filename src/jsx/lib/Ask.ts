import * as code from '../../code';

export function Ask(element: any) {
  return code.call(code.fun(...element.renderChildren()));
}
