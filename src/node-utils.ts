import { dirname, join, parse, relative } from 'path';

export function getTargetPath(
  path: string,
  targetExt: string | undefined,
  outDir: string = '../dist'
) {
  const rootDir = join(__dirname, '../src');
  const testDir = relative(rootDir, dirname(path));
  const targetDir = join(rootDir, outDir, testDir);
  const { name: testName, ext } = parse(path);
  return join(targetDir, `${testName}.${targetExt ?? ext}`);
}
