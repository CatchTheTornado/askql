#!/usr/bin/env node

import { ReplOptions, REPLServer, start } from 'repl';
import { askCodeToSource } from './askcode';
import * as askscript from './askscript';
import { Options, resources, run } from './askvm';
import chalk = require('chalk');

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
      // If the input is empty, do nothing
      if (code.trim() == '') {
        return undefined;
      }

      try {
        const parsedCode = askscript.parse(`ask {\n${code}\n}`);
        const { type, value } = await run(options, parsedCode);
        console.log(
          chalk.blueBright(type.name),
          chalk.grey(askCodeToSource(parsedCode))
        );
        return value;
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
