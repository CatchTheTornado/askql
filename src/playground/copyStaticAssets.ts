import * as shell from 'shelljs';

shell.mkdir('-p', 'dist/public/');
shell.cp('-R', 'src/public/assets/css', 'dist/public/');
shell.cp('-R', 'src/views', 'dist/');
