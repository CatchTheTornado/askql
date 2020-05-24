import { existsSync } from 'fs';
import { basename, join } from 'path';

export function process(src: string, filename: string) {
  let source: string | undefined;
  try {
    const { askCodeToSource, parse } = require('.');
    const name = basename(filename, '.ask');
    const isImplemented = !existsSync(
      join(filename, '..', `${name}.out.tsx.notImplemented`)
    );
    if (isImplemented) {
      // console.log('IS IMPLEMENTED!');
      source = askCodeToSource(parse(src));
    }
  } catch (e) {
    console.error({
      source,
      src,
      filename,
    });
    throw e;
  }

  return {
    code: `module.exports = ${source ? JSON.stringify(source) : null}`,
  };
}
