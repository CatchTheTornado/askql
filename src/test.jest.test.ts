import { dirname, join, parse, relative } from 'path';

declare var jestTestPath: string;

const rootDir = join(__dirname, '../src');
const testDir = relative(rootDir, dirname(jestTestPath));
const targetDir = join(rootDir, '../dist', testDir);
const { name } = parse(jestTestPath);
const targetPath = join(targetDir, `${name}.js`);

test('produces correct answer', () => {
  expect(2 + 2).toBe(4);
});
