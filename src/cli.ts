#!/usr/bin/env node

import { ReplOptions, REPLServer, start } from 'repl';
import { parse } from './askcode';
import { resources, runUntyped, Options } from './askvm';

const ask = require('./askscript/parser/askscript.grammar');

export type Context = Record<string, any>;

const values = {
  clientNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  hello: 'Hi! This is a local AskVM running a REPL',
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

const options: Options = {
  resources,
  values,
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
    (async () => {

      let isAskProgram;
      try {
        ask.parse(code, {startRule: 'askForRepl'});
        isAskProgram = true;
      } catch (e) {
        isAskProgram = false;
      }
      
      try {
        const result = isAskProgram ? ask.parse(code) : await runUntyped(options, parse(code));
        cb(null, result);
      } catch (e) {
        cb(e, null);
      }
    })();
  },
};

start(replOptions);
