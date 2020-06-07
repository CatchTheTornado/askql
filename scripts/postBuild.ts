import fs from 'fs';
import rimraf from 'rimraf';

rimraf(__dirname,error => { if (error) throw error;});

fs.copyFileSync('README.md', 'dist/README.md');
console.log('README.md was copied to dist');