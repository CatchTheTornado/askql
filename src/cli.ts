#!/usr/bin/env node

import { start, REPLServer, ReplOptions } from 'repl';
import { parse } from './askcode';
import { run, resources } from './askvm';

export type Context = Record<string, any>;

export const replOptions: ReplOptions = {
  prompt: '!> ',
  completer(line: string) {
    const completions = Object.keys(resources);
    const hits = completions.filter((c) => c.startsWith(line));
    // Show all completions if none found
    return [hits.length ? hits : completions, line];
  },
  eval(
    this: REPLServer,
    code: string,
    context: Context,
    file: string,
    cb: (err: Error | null, result: any) => void
  ) {
    try {
      const result = run({ resources }, parse(code));
      // cb(null, new TypedValue(35, 'any'));
      cb(null, result);
    } catch (e) {
      cb(e, null);
    }
  },
};

start(replOptions);
