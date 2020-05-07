import { AskCode, AskCodeOrValue, Value } from '../../askcode';
import * as res from '../resources';
import { Resources as BaseResources } from './resource';
import { Frame, step } from './step';
import { typed, Typed, untyped } from './typed';
import type { JSONable } from './typed';

export function getScope(resources: BaseResources, code?: AskCode): any {
  if (!code) {
    return resources;
  }

  if (code.name !== 'fun') {
    return getScope(resources, code.parent);
  }

  return code.scope!;
}

const resources = {
  ...res,
  null: res.empty,
  f: res.fun,
};

type Resources = typeof resources;

export function run(code: AskCodeOrValue, args?: any[]): JSONable {
  return untyped(
    step(
      {
        resources,
        value(value: Value): Typed<any> {
          return typed(value);
        },
        code(code: AskCode, frame: Frame<Typed<any>, Resources>): Typed<any> {
          const { resources } = frame;
          const res = resources[code.name as keyof typeof resources];
          // TODO better code for resource retrieval
          if (!res) {
            throw new Error(`Unknown resource ${code.name}!`);
          }

          if (res.compute) {
            return res.compute(code, frame);
          }
          return res as any; // TODO fix with scopes
        },
      },
      code,
      args
    )
  );
}
