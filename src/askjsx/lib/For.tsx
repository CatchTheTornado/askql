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
  if (!isAskCode(key)) {
    throw new AssertionError({
      message: 'forOf expects key to be a statement',
    });
  }
  if (typeof ofProp === 'undefined') {
    // Would have use assert, but then compiler complains that ofProp in <Let/> could be undefined.
    throw new AssertionError({ message: 'ofProp is undefined' });
  }

  return (
    <fragment>
      <Let name="$ofValue" value={Object.values({ ofProp })} />
      <Let name="$index" value={0} />
      <While
        condition={
          <Call
            name="<"
            args={[
              <ref name="$index" />,
              <call name="length" args={[<ref name="$ofValue" />]} />,
            ]}
          />
        }
      >
        {children}
        <Assign
          name="$index"
          value={<Call name="+" args={[<ref name="$index" />, 1]} />}
        />
      </While>
    </fragment>
  );
}
