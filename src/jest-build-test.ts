import { mkdir, readFile, writeFile } from 'fs.promises';
import { dirname, join, parse, relative } from 'path';
import { process as toJavaScriptSource } from './javascript.jest.transformer';

declare var jestTestPath: string;

const testPath = jestTestPath;
const rootDir = join(__dirname, '../src');
const testDir = relative(rootDir, dirname(jestTestPath));
const targetDir = join(rootDir, '../dist', testDir);

const { name: testName, ext: fileExt } = parse(jestTestPath);

const targetPath = join(targetDir, `${testName}.js`);

// TODO '.*/__tests__/.*',
// special case

test(`saves ${targetPath}`, async () => {
  const src: string = await readFile(jestTestPath, { encoding: 'utf-8' });
  expect(src).toBeDefined();

  const javaScriptSource = toJavaScriptSource(src, testPath);
  expect(javaScriptSource).toBeDefined();

  await mkdir(targetDir, { recursive: true });
  await writeFile(targetPath, javaScriptSource);
});
