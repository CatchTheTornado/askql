interface AskScriptParser {
  parse(code: string): object;
}

import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';

// Include AskScript parser
const parserFilePath = path.resolve(
  __dirname,
  '../../dist/parser/askscript.grammar.js'
);
const parserClassesFilePath = path.resolve(
  __dirname,
  '../../dist/parser/askscript.grammar.pegjs.classes.ts'
);

if (!fs.existsSync(parserFilePath)) {
  const parts = path.parse(parserFilePath);
  fs.mkdirSync(parts.dir, { recursive: true });
  childProcess.execSync(
    `npx pegjs -o ${parserFilePath} parser/askscript.grammar.pegjs`,
    {
      cwd: __dirname,
    }
  );
}

if (!fs.existsSync(parserClassesFilePath)) {
  const absolutePath = path.resolve(
    __dirname,
    'parser/askscript.grammar.pegjs.classes.ts'
  );

  fs.copyFileSync(absolutePath, parserClassesFilePath);
}

export const parser: any = require(parserFilePath);
