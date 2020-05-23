import { AskCodeOrValue } from '../../askcode';
import * as askjsx from './jsx';
askjsx;

/*
query {
  firstName
  lastName
  parents {
    firstName
    lastName
  }
}

<query>
  <node name="firstName" value={<ref name="firstName" />} />
  <node name="lastName" value={<ref name="lastName" />} />
  <node name="parents">
    <node name="firstName" value={<ref name="firstName" />} />
    <node name="lastName" value={<ref name="lastName" />} />
  </node>
</query>
*/

export function Query({ children = [] }: { children?: AskCodeOrValue[] }) {
  return <code query>{children}</code>;
}

export function Node({
  name,
  value = <ref name={name as any} />,
  children = [],
}: {
  name: AskCodeOrValue;
  value?: AskCodeOrValue[];
  children?: AskCodeOrValue[];
}) {
  return (
    <code node>
      {name}
      <fragment>{value}</fragment>
      {children}
    </code>
  );
}
