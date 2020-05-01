import * as jsx from './jsx';
import { render } from './jsx';
jsx;

export function Return({ value }: { value: string }) {
  return (
    <set>
      {render(value)}
      {'frame'}
      {'returnedValue'}
    </set>
  );
}
