#!/usr/bin/env node

import { start, REPLServer, ReplOptions } from 'repl';
import { parse } from './askcode';
import { run, resources, runUntyped } from './askvm';

export type Context = Record<string, any>;

const values = {
  clientNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  revPerClient: {
    A: 136,
    B: 426,
    C: 133,
    D: 35,
    E: 246,
    F: 446,
    G: 53,
  },
  test: 5,
};

export const replOptions: ReplOptions = {
  prompt: '🦄 ',
  completer(line: string) {
    const completions = [...Object.keys(resources), ...Object.keys(values)];
    const hits = completions.filter((c) => c.startsWith(line));
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
      const result = runUntyped({ resources, values }, parse(code));
      cb(null, result);
    } catch (e) {
      cb(e, null);
    }
  },
};

start(replOptions);
