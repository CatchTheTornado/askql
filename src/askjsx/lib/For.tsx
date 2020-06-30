import { AskCodeOrValue, isAskCode } from '../../askcode';
import * as askjsx from './jsx';
import { Let, Assign } from './Let';
import { assert } from 'console';
import { AssertionError } from 'assert';
import { While } from './While';
import { Call } from './Call';
askjsx;

export function For({
  initialization,
  condition = true,
  finalExpression,
  children,
}: {
  initialization?: AskCodeOrValue;
  condition?: AskCodeOrValue;
  finalExpression?: AskCodeOrValue;
  children: AskCodeOrValue[];
}) {
  return (
    <fragment>
      {initialization}
      <while condition={condition}>
        {children}
        {finalExpression}
      </while>
    </fragment>
  );
}

export function ForIn({
  key,
  in: inProp,
  children,
}: {
  key: AskCodeOrValue;
  in?: AskCodeOrValue;
  children: AskCodeOrValue[];
}) {
  return (
    <code forIn>
      {key}
      {inProp}
      <code block>{children}</code>
    </code>
  );
}

export function ForOf({
  key,
  of: ofProp,
  children,
}: {
  key: AskCodeOrValue;
  of?: AskCodeOrValue;
  children: AskCodeOrValue[];
}) {
  return (
    <code forOf>
      {key}
      {ofProp}
      <code block>{children}</code>
    </code>
  );
}
