import * as ts from 'typescript';
import { extname } from 'path';
import * as peg from 'pegjs';
const tsConfig = require('../tsconfig.json');

export function process(src: string, path: string) {
  if (path.endsWith('.js')) {
    return src;
  }

  if (path.endsWith('.ts') || path.endsWith('.tsx')) {
    return ts.transpile(src, tsConfig.compilerOptions, path, []);
  }

  if (path.endsWith('.pegjs')) {
    return peg.generate(src, {
      format: 'commonjs',
      output: 'source',
    });
  }

  throw new Error(`Invalid file extensions: ${extname(path)}`);
}
