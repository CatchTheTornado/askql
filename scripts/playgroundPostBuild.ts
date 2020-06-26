import { promises as pfs } from 'fs';
import fs from 'fs';

import * as shell from 'shelljs';

async function main() {
  await copyEnv();
  await copyStaticAssets();
}

async function copyEnv() {
  try {
    if (fs.existsSync('.env')) {
      await pfs.copyFile('.env', 'dist/.env');
      console.log('.env was copied to dist');
    } else {
      await pfs.copyFile('.env.example', 'dist/.env');
      console.log('.env.example was copied to dist');
    }
  } catch (e) {
    console.error(e);
  }
}

async function copyStaticAssets() {
  try {
    shell.mkdir('-p', 'dist/playground/public/');
    shell.cp(
      '-R',
      'src/playground/public/assets/css',
      'dist/playground/public/'
    );
    shell.cp('-R', 'src/playground/views', 'dist/playground');
  } catch (e) {
    console.error(e);
  }
}

main();
