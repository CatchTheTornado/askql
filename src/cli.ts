#!/usr/bin/env node

import { ReplOptions, REPLServer, start } from 'repl';
import { AskCodeOrValue, parse } from './askcode';
import { createElement } from './askjsx';
import { parser as askscript } from './askscript';
import { Options, resources, run } from './askvm';

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

function fromAst({ name, props, children = [] }: any): AskCodeOrValue {
  return createElement(name, props, ...children.map(fromAst));
}

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
      // If the input is empty, do nothing
      if (code.trim() == '') {
        return undefined;
      }

      let isAskProgram;
      try {
        askscript.parse(code, { startRule: 'askForRepl' });
        isAskProgram = true;
      } catch (e) {
        isAskProgram = false;
      }

      try {
        const { type, value } = isAskProgram
          ? await run(options, fromAst(askscript.parse(code).print()))
          : await run(options, parse(code));
        return [value, type.name];
      } catch (e) {
        throw e;
      }
    })().then(
      (result) => cb(null, result),
      (error) => cb(error, null)
    );
  },
};

start(replOptions);
