import { promises as pfs } from 'fs';
import { pick } from 'lodash';
import fs from 'fs';

import packageJson from '../package.json';

const propertiesToPreserveFromPackageJSON = [
  'name',
  'version',
  'description',
  'main',
  'bin',
  'repository',
  'license',
  'bugs',
  'homepage',
  'dependencies',
  'peerDependencies',
];

async function main() {
  await copyReadme();
  await copyPackageJson();
}

async function copyReadme() {
  try {
    await pfs.copyFile('README.md', 'dist/README.md');
    console.log('README.md was copied to dist');
  } catch (e) {
    console.error(e);
  }
}

async function copyPackageJson() {
  await pfs.writeFile(
    'dist/package.json',
    JSON.stringify(
      pick(packageJson, propertiesToPreserveFromPackageJSON),
      null,
      2
    )
  );
  console.log('Package.json was written to dist');
}

main();
