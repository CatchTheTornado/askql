import { existsSync } from 'fs';
import { basename, join } from 'path';
import { process as toJavaScript } from './javascript.jest.transformer';

export function process(src: string, filename: string) {
  let source: string | null = null;
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
    code: toJavaScript(src, filename),
  };
}
