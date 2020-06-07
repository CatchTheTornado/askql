import {promises} from 'fs';

promises.copyFile('README.md', 'dist/README.md')
    .then(() => console.log('README.md was copied to dist'))
    .catch(err => { if (err) throw err;});
