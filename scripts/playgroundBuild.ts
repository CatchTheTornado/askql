import { removeRecursive } from './utils';
import { mkdir } from 'shelljs';

async function main() {
  try {
    await removeRecursive('./dist/playground/');
    mkdir('-p', 'dist/playground/public/');
  } catch (e) {
    console.error(e);
  }
}

main();
