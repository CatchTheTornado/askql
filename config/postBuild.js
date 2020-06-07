const fs = require('fs');

fs.copyFileSync('README.md', 'dist/README.md');
console.log('README.md was copied to dist');