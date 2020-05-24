import * as ts from 'typescript';
const tsConfig = require('../tsconfig.json');

export function process(src: string, path: string) {
  // console.log('transpile', path);
  if (path.endsWith('.ts') || path.endsWith('.tsx')) {
    return ts.transpile(src, tsConfig.compilerOptions, path, []);
  }
  return src;
}
