import { askvm } from '..';
import { AskCodeOrValue, parse } from '../askcode';
import { JSONable, Typed } from '../askvm/lib/typed';

export function run(code: AskCodeOrValue, args?: any): Typed<JSONable> {
  return askvm.run(
    {
      resources: askvm.resources,
    },
    code,
    args
  );
}

export function ask(code: AskCodeOrValue, args?: any): JSONable {
  return askvm.runUntyped(
    {
      resources: askvm.resources,
    },
    code,
    args
  );
}

export function vm(code: string) {
  return ask(parse(code));
}
