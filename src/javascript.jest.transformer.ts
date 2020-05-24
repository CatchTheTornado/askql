import { extname } from 'path';
import * as peg from 'pegjs';
import * as ts from 'typescript';
import tsConfig = require('./tsconfig.json');

export function process(src: string, path: string) {
  if (path.endsWith('.pegjs')) {
    return peg.generate(src, {
      format: 'commonjs',
      output: 'source',
    });
  }

  if (path.endsWith('.ts') || path.endsWith('.tsx')) {
    return ts.transpile(
      src,
      tsConfig.compilerOptions as Omit<ts.CompilerOptions, 'jsx'>,
      path,
      []
    );
  }

  if (path.endsWith('.js')) {
    return src;
  }

  if (path.endsWith('.ask')) {
    const askScriptJson = JSON.stringify(src); // TODO(mh): assert compiles
    return `module.exports = ${askScriptJson};`;
  }

  throw new Error(`Invalid file extensions: ${extname(path)}`);
}
