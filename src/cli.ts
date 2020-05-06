#!/usr/bin/env node

import { start, REPLServer } from 'repl';
import { parse } from './askcode';
import { run } from './askvm';

export type Context = Record<string, any>;

const r = start({
  prompt: '!> ',
  eval: function (
    this: REPLServer,
    code: string,
    context: Context,
    file: string,
    cb: (err: Error | null, result: any) => void
  ) {
    try {
      const result = run(parse(code));
      // cb(null, new TypedValue(35, 'any'));
      cb(null, result);
    } catch (e) {
      cb(e, null);
    }
  },
});
