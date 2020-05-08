import { askvm } from '..';
import { AskCodeOrValue, parse } from '../askcode';

export async function run(code: AskCodeOrValue, args?: any) {
  return askvm.run(
    {
      resources: askvm.resources,
    },
    code,
    args
  );
}

export async function ask(code: AskCodeOrValue, args?: any) {
  return askvm.runUntyped(
    {
      resources: askvm.resources,
    },
    code,
    args
  );
}

export async function vm(code: string) {
  return ask(parse(code));
}
