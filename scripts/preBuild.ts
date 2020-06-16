import { removeRecursive } from './utils';

async function main() {
  try {
    await removeRecursive('./dist/');
  } catch (e) {
    console.error(e);
  }
}

main();
