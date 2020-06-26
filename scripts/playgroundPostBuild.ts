import { promises as pfs } from 'fs';
import fs from 'fs';

async function main() {
  await copyEnv();
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

main();
