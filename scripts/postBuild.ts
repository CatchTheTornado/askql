import { promises as fs } from 'fs';

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
    await fs.copyFile('README.md', 'dist/README.md');
    console.log('README.md was copied to dist');
  } catch (e) {
    console.error(e);
  }
}

async function copyPackageJson() {
  const releasePackageJson: any = {};
  Object.keys(packageJson).forEach((key) => {
    if (propertiesToPreserveFromPackageJSON.indexOf(key) > -1) {
      // @ts-ignore
      releasePackageJson[key] = packageJson[key];
    }
  });
  await fs.writeFile(
    'dist/package.json',
    JSON.stringify(releasePackageJson, null, 2)
  );
  console.log('Package.json was written to dist');
}

main();
