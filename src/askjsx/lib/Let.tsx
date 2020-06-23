import { assert, isString } from '../../utils';
import * as askjsx from './jsx';
import { AskCodeOrValue } from '../../askcode';
askjsx;

type Props = {
  name: string;
  type?: string;
  value: AskCodeOrValue;
};

function Set({
  code,
  name,
  value,
}: Props & {
  code: 'let' | 'const' | 'assign';
}) {
  if (typeof name !== 'string') {
    name = (name as any).params[0]; // fixme(me)
  }
  assert(
    isString(name),
    `name should be string, got: ${JSON.stringify(name, null, 2)}`
  );

  return (
    <code {...{ [code]: true }}>
      {name.split('.')}
      {value}
    </code>
  );
}

export const Let = (props: Props) => <Set {...props} code="let" />;
export const Const = (props: Props) => <Set {...props} code="const" />;
export const Assign = (props: Props) => <Set {...props} code="assign" />;
