import { mkdir, readFile, writeFile } from 'fs.promises';
import { dirname } from 'path';
import { process as toJavaScriptSource } from './javascript.jest.transformer';
import { getTargetPath } from './node-utils';

declare var jestTestPath: string;
const testPath = jestTestPath;
const targetPath = getTargetPath(testPath, 'js');

// TODO '.*/__tests__/.*',
// special case

test(`saves ${targetPath}`, async () => {
  const src: string = await readFile(jestTestPath, { encoding: 'utf-8' });
  expect(src).toBeDefined();

  const javaScriptSource = toJavaScriptSource(src, testPath);
  expect(javaScriptSource).toBeDefined();

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, javaScriptSource);
});
