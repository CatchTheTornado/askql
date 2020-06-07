import {promises} from 'fs';

async function main() {
    try {
        await promises.copyFile('README.md', 'dist/README.md');
        console.log('README.md was copied to dist');
    } catch (e) {
        console.error(e);
    }
}

main();
