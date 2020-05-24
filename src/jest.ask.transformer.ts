import { existsSync } from 'fs';
import { basename, join } from 'path';
import { askCodeToSource, parse } from '.';

export function process(src: string, filename: string) {
  let source: string | undefined;
  try {
    const name = basename(filename, '.ask');
    const isImplemented = !existsSync(
      join(filename, '..', `${name}.out.tsx.notImplemented`)
    );
    if (isImplemented) {
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
