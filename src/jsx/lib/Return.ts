import * as code from '../../code';
import { render } from './jsx';

export function Return(element: any) {
  const { value } = element.props;
  return code.set(render(value), 'frame', 'returnedValue');
}
