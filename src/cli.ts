#!/usr/bin/env node

import { start, REPLServer } from 'repl';
import { parse } from './askcode';
import { run } from './askvm';

const ask = require('./askscript/parser/askscript.grammar');

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
    let isAskProgram;
    try {
      ask.parse(code, {startRule: 'askForRepl'});
      isAskProgram = true;
    } catch (e) {
      isAskProgram = false;
    }
    
    try {
      const result = isAskProgram ? ask.parse(code) : run(parse(code));
      // cb(null, new TypedValue(35, 'any'));
      cb(null, result);
    } catch (e) {
      cb(e, null);
    }
  },
});
