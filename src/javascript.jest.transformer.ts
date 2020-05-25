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
    // FIXME this does not fail on type errors!
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
    // TODO(mh): assert compiles
    return `module.exports = function () {
  return new Promise(askvm.bind(null, ${JSON.stringify(src)}, arguments));
};`;
  }

  throw new Error(`Invalid file extensions: ${extname(path)}`);
}
