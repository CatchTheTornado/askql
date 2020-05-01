import * as jsx from './jsx';
import { Set } from './Set';
jsx;

export function Return({ value }: { value: string }) {
  return (
    <fragment>
      <Set name="frame.returnedValue" value={value} />
    </fragment>
  );
}
