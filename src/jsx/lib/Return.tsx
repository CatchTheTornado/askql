import * as jsx from './jsx';
import { render } from './jsx';
jsx;

export function Return(element: any) {
  const { value } = element.props;
  return (
    <set>
      {render(value)}
      {'frame'}
      {'returnedValue'}
    </set>
  );
}
